import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course, CreateCoursePayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Create Course': props<{ payload: CreateCoursePayload }>(),
    'Create Course Success': props<{ data: Course }>(),
    'Create Course Failure': props<{ error: HttpErrorResponse }>(),
  }
});
