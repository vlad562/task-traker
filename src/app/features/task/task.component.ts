import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
}
