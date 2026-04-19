import { Injectable, inject } from '@angular/core'; // добавили inject
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  EMPTY,
  forkJoin,
  map,
  mergeMap,
  of,
  take,
} from 'rxjs';
import { TaskService } from '../../../core/services/task-service.service';
import { TaskActions } from './task.action';
import { Store } from '@ngrx/store';
import { taskFeature } from './task.reducer';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);
  private store = inject(Store);
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
        console.log(1,targetTask)
        console.log(1,switchTask)
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
        console.log(updateTarget);
        console.log(updateSwitch);
        return forkJoin([
          this.taskService.updateTask(targetTask.id, updateTarget),
          this.taskService.updateTask(switchTask.id, updateSwitch),
        ]).pipe(
          map(() =>
            TaskActions.switchTaskSuccess({
              targetTask: updateTarget,
              switchTask: updateSwitch,
            }),
          ),
          catchError((error) =>
            of(TaskActions.switchTaskFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
