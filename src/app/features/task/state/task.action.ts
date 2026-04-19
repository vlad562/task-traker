import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../task.component';
export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),

    'Update Task': props<{ id: number; changes: Partial<Task> }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string }>(),

    'Switch Tasks': props<{ targetTask: Task; switchTask: Task }>(),
    'Switch Task Success': props<{ targetTask: Task; switchTask: Task }>(),
    'Switch Task Failure': props<{ error: string }>(),
  },
});
