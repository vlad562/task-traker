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

    on(TaskActions.updateTask, (state) => ({
      ...state,
      loading: true,
    })),

    on(TaskActions.updateTaskSuccess, (state, { task }) => ({
      ...state,
      loading: false,
      tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    })),

    on(TaskActions.updateTaskFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),

    on(TaskActions.switchTasks, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),

    on(TaskActions.switchTaskSuccess, (state, { targetTask, switchTask }) => {
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((t) => {
          if (t.id === targetTask.id) {
            return { ...t, ...targetTask };
          }
          if (t.id === switchTask.id) {
            return { ...t, ...switchTask };
          }
          return t;
        }),
      };
    }),
    on(TaskActions.switchTaskFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),
  ),
});
