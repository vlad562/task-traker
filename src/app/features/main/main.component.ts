import { Component, computed, inject, signal } from '@angular/core';
import { ColumnComponent } from '../column/column.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { taskFeature } from '../task/state/task.reducer';
import { TaskActions } from '../task/state/task.action';
import { DragService } from '../task/services/task.service';
import { InputComponent } from '../../share/search-input/search-input.input.component';
import { Task, TaskStatus } from '../task/interfaces/task.interface';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ColumnComponent, TaskComponent, InputComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private store = inject(Store);
  public tasks = toSignal(this.store.select<Task[]>(taskFeature.selectTasks), {
    initialValue: [],
  });
  public searchQuery = signal<string>('');
  public activeTab = 'new';

  constructor(public dragService: DragService) {
    this.store.dispatch(TaskActions.loadTasks());
  }

  groupedTasks = computed(() => {
    const allTasks = this.tasks();
    const searchedValue = this.searchQuery();

    const filterTasks = searchedValue
      ? allTasks.filter((task) =>
          task.title.toLowerCase().includes(searchedValue),
        )
      : allTasks;

    const groups: Record<TaskStatus, Task[]> = {
      todo: [],
      inProgress: [],
      inReview: [],
      done: [],
    };

    filterTasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });

    return groups;
  });

  draggedTask = computed<Task | null>(() => {
    const id = this.dragService.state().activeId;
    if (!id) return null;
    return this.tasks().find((t) => t.id === id) ?? null;
  });

  searchTask(value: string) {
    this.searchQuery.set(value);
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  onPointerMove(event: PointerEvent) {
    const dragState = this.dragService.state();
    if (!dragState.activeId) return;

    const position = {
      x: event.clientX - dragState.offsetX,
      y: event.clientY - dragState.offsetY,
    };

    this.dragService.setDragState(position);
  }

  onPointerUp(event: PointerEvent) {
    const dragState = this.dragService.state();
    if (!dragState.activeId) return;

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY,
    ) as HTMLElement | null;
    const columnEl = element?.closest('[data-column-id]');
    const toColumn = columnEl?.getAttribute('data-column-id') as TaskStatus;
    const toTask = element?.closest('[data-task-id]') as HTMLElement | null;

    if (toTask) {
      const targetId = Number(toTask.getAttribute('data-task-id'));
      const switchId = dragState.activeId;
      if (targetId === switchId) {
        this.dragService.clear();
        return;
      }
      const allTasks = this.tasks();
      const task1 = allTasks.find((t) => t.id === targetId);
      const task2 = allTasks.find((t) => t.id === switchId);

      if (task1 && task2) {
        this.store.dispatch(
          TaskActions.switchTasks({
            targetTask: task1,
            switchTask: task2,
          }),
        );
      }
      this.dragService.clear();
    }

    if (!toColumn) {
      this.dragService.clear();
      return;
    }

    const task = this.tasks().find((t) => t.id === dragState.activeId);

    if (!task) {
      this.dragService.clear();
      return;
    }

    this.store.dispatch(
      TaskActions.updateTask({ id: task.id, changes: { status: toColumn } }),
    );

    this.dragService.clear();
  }
}
