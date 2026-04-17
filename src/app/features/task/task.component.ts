import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
export interface Task {
  id: number;
  title: string;
  description?: string;
  tag: string;
  attachments: number;
  isPriority: boolean;
  date: Date;
  authorAvatars: string[];
  status: string;
}
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, CdkDragPlaceholder],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
}
