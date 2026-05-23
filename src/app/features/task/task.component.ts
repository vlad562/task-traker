import { DatePipe } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  input,
  Input,
  signal,
} from '@angular/core';
import { DragService } from './services/task.service';
import { Store } from '@ngrx/store';
import { Task } from './interfaces/task.interface';
import { ContextMenuDirective } from '../../share/directive/context-menu/context-menu.directive';
import { TaskService } from '../../core/services/task-service.service';
import { TaskActions } from './state/task.action';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, ContextMenuDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  task = input.required<Task>();
  store = inject(Store);
  dragService = inject(DragService);
  taskService = inject(TaskService);

  isMenuOpen = signal<boolean>(false);
  menuPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });
  selectedTaskId = signal<number | null>(null);

  onPointerDown(event: PointerEvent) {
    const task = this.task();
    if (!task) return;
    if (event.cancelable) {
      event.preventDefault();
    }
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    this.dragService.setDragState({
      activeId: task.id,
      fromColumn: task.status,
      offsetX,
      offsetY,

      x: event.clientX - offsetX,
      y: event.clientY - offsetY,

      width: rect.width,
      height: rect.height,
    });
    el.setPointerCapture(event.pointerId);
  }

  openMenu(coords: { x: number; y: number }, taskId: number) {
    this.menuPosition.set(coords);
    this.selectedTaskId.set(taskId);
    this.isMenuOpen.set(true);
  }

  @HostListener('document:click')
  closeMenu() {
    this.isMenuOpen.set(false);
    this.selectedTaskId.set(null);
  }

  deleteTask() {
    const idToDelete = this.selectedTaskId();
    if (idToDelete) {
      this.store.dispatch(TaskActions.deleteTask({ id: idToDelete }));
    }
  }
}