import { DatePipe } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { DragService } from './services/task.service';
import { Store } from '@ngrx/store';
import { TaskActions } from './state/task.action';

export type TaskStatus = 'todo' | 'inProgress' | 'inReview' | 'done';
export interface Task {
  id: number;
  title: string;
  description?: string;
  tag: string;
  attachments: number;
  isPriority: boolean;
  date: Date;
  authorAvatars: string[];
  status: TaskStatus;
}

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
