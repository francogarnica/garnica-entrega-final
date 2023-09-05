import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateTeacherPayload, Teacher } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { empty } from 'rxjs';
import { Course } from '../../courses/models';

export const TeacherActions = createActionGroup({
  source: 'Teacher',
  events: {
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ data: Teacher[] }>(),
    'Load Teachers Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Teacher': props<{ payload: CreateTeacherPayload }>(),
    'Create Teacher Success': props<{ data: Teacher }>(),
    'Create Teacher Failure': props<{ error: HttpErrorResponse }>(),
  }
});
