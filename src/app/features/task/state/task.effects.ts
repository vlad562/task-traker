import { Injectable, inject } from '@angular/core'; 
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  forkJoin,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { TaskService } from '../../../core/services/task-service.service';
import { TaskActions } from './task.action';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((err) =>
            of(TaskActions.loadTasksFailure({ error: err.message })),
          ),
        ),
      ),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap(({ task }) =>
        this.taskService.create(task).pipe(
          map((newTask) => {
            return TaskActions.createTaskSuccess({ task: newTask });
          }),
          catchError((error) => of(TaskActions.createTaskFailure({ error }))),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ id, changes }) =>
        this.taskService.updateTask(id, changes).pipe(
          map((updatedTask) =>
            TaskActions.updateTaskSuccess({ task: updatedTask }),
          ),
          catchError((error) =>
            of(TaskActions.updateTaskFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
  switchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.switchTasks),
      concatMap(({ targetTask, switchTask }) => {
        const updateTarget = {
          ...switchTask,
          id: targetTask.id,
          status: targetTask.status,
        };
        const updateSwitch = {
          ...targetTask,
          id: switchTask.id,
          status: targetTask.status,
        };
        return forkJoin([
          this.taskService.updateTask(targetTask.id, updateTarget),
          this.taskService.updateTask(switchTask.id, updateSwitch),
        ]).pipe(
          map(() =>
            TaskActions.switchTasksSuccess({
              targetTask: updateTarget,
              switchTask: updateSwitch,
            }),
          ),
          catchError((error) =>
            of(TaskActions.switchTasksFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
