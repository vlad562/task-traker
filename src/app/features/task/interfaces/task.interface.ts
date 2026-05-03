import { FormControl, FormGroup } from '@angular/forms';
import { ToFormGroup } from '../../../share/helpers/interfaces/interface';

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

export type TaskFormModel = Pick<
  Task,
  'title' | 'description' | 'tag' | 'attachments' | 'date' | 'isPriority'
>;

export type TaskForm = ToFormGroup<TaskFormModel>
