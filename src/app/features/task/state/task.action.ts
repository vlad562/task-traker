import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../task.component';
export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
  },
});
