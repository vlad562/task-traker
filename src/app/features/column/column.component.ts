import { Component, computed, input, output } from '@angular/core';
import { Task, TaskComponent } from '../task/task.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  standalone: true,
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  imports: [TaskComponent, DragDropModule],
})
export class ColumnComponent {
  title = input<string>('');
  id = input<string>(''); // id колонки (напр. 'todo')
  tasks = input<Task[]>([]);
  connectedTo = input<string[]>([]); // массив ID других колонок

  // Создаем событие для родителя, так как данные меняются в Store
  taskDropped = output<CdkDragDrop<Task[]>>();

  count = computed(() => this.tasks().length);

  drop(event: CdkDragDrop<Task[]>) {
    this.taskDropped.emit(event);
  }
}