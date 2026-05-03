import { Component, computed, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task/task-form/task-form.component';
import { Task, TaskStatus } from '../task/interfaces/task.interface';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-column',
  standalone: true,
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  imports: [TaskComponent],
})
export class ColumnComponent {
  title = input<string>('');
  tasks = input<Task[]>([]);
  count = computed(() => this.tasks().length);
  columnId = input<TaskStatus>('todo');
  constructor(private dialog: MatDialog) {}

  openTaskForm() {
    this.dialog.open(TaskFormComponent, {
      height: '400px',
      data: {
        status: this.columnId(),
      },
    });
  }
}
