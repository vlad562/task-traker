import { Injectable, inject } from '@angular/core'; // добавили inject
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaskService } from '../../../core/services/task-service.service';
import { TaskActions } from './task.action';

@Injectable()
export class TaskEffects {
  // Вместо конструктора используем inject - это стабильнее в Angular 18
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
}
