import { Component, computed, input } from '@angular/core';
import { Task, TaskComponent } from '../task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  standalone: true,
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  imports: [TaskComponent, DragDropModule],
})
export class ColumnComponent {
  title = input<string>('');
  tasks = input<Task[]>([]);
  count = computed(() => this.tasks().length);
}
