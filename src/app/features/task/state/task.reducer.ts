import { createFeature, createReducer, on } from '@ngrx/store';
import { initialState } from './task.state';
import { TaskActions } from './task.action';

export const taskFeature = createFeature({
  name: 'Tasks',
  reducer: createReducer(
    initialState,
    on(TaskActions.loadTasks, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
      ...state,
      tasks,
      loading: false,
      error: null,
    })),
    on(TaskActions.loadTasksFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});
