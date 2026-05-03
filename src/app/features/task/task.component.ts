import { DatePipe } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { DragService } from './services/task.service';
import { Store } from '@ngrx/store';
import { Task } from './interfaces/task.interface';



@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  task = input.required<Task>();
  store = inject(Store);
  dragService = inject(DragService);

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
}
