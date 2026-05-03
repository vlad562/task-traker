import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../interfaces/task.interface';
export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),

    'Create Task': props<{ task: Task }>(),
    'Create Task Success': props<{ task: Task }>(),
    'Create Task Failure': props<{ error: string }>(),

    'Update Task': props<{ id: number; changes: Partial<Task> }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string }>(),

    'Switch Tasks': props<{ targetTask: Task; switchTask: Task }>(),
    'Switch Tasks Success': props<{ targetTask: Task; switchTask: Task }>(),
    'Switch Tasks Failure': props<{ error: string }>(),
  },
});
