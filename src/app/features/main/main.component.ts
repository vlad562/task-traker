import { Component, computed, inject } from '@angular/core';
import { ColumnComponent } from '../column/column.component';
import { Task } from '../task/task.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { taskFeature } from '../task/state/task.reducer';
import { TaskActions } from '../task/state/task.action';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ColumnComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor() {
    this.store.dispatch(TaskActions.loadTasks());
  }
  private store = inject(Store);
  tasks = toSignal(this.store.select<Task[]>(taskFeature.selectTasks), {
    initialValue: [],
  });
  activeTab = 'new';
  groupedTasks = computed(() => {
    const allTasks = this.tasks();
    console.log(allTasks);
    const groups = {
      todo: [] as Task[],
      inProgress: [] as Task[],
      review: [] as Task[],
      done: [] as Task[],
    };

    allTasks.forEach((task) => {
      if (task.status === 'todo') groups.todo.push(task);
      else if (task.status === 'inProgress') groups.inProgress.push(task);
      else if (task.status === 'inReview') groups.review.push(task);
      else if (task.status === 'done') groups.done.push(task);
    });
    console.log(groups);
    return groups;
  });

  taskTodos = computed(() => this.groupedTasks().todo);
  taskInProgress = computed(() => this.groupedTasks().inProgress);
  taskInReview = computed(() => this.groupedTasks().review);
  taskDone = computed(() => this.groupedTasks().done);

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  onTaskDrop(event: CdkDragDrop<Task[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      // Логика сортировки внутри одной колонки (опционально)
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.item.data as Task;
      // Диспатчим экшен для обновления статуса в Store
      this.store.dispatch(
        TaskActions.updateTaskStatus({
          taskId: task.id,
          newStatus: newStatus,
        }),
      );
    }
  }
}
