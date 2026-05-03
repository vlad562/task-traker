import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskActions } from '../state/task.action';
import { TaskStatus, Task, TaskForm } from '../interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: TaskStatus },
  ) {}

  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('Delete Task', { nonNullable: true }),
    description: new FormControl('Create function for delete task', {
      nonNullable: true,
    }),
    tag: new FormControl('Development', { nonNullable: true }),
    attachments: new FormControl(0, { nonNullable: true }),
    date: new FormControl(new Date(), { nonNullable: true }),
    isPriority: new FormControl(true, { nonNullable: true }),
  });

  onSubmit() {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.getRawValue();

      const newTask: Task = {
        id: 0,
        title: formValues.title,
        description: formValues.description,
        tag: formValues.tag,
        attachments: Number(formValues.attachments),
        date: formValues.date,
        isPriority: !!formValues.isPriority,
        status: this.data.status,
        authorAvatars: [],
      };
      this.store.dispatch(TaskActions.createTask({ task: newTask }));

      this.dialogRef.close();
    }
  }
}
