import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TeacherActions } from './teacher.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { CreateTeacherPayload, Teacher } from '../models';
import { Course } from '../../courses/models';


@Injectable()
export class TeacherEffects {

  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeacherActions.loadTeachers),
      concatMap(() =>
        this.getTeachersFromDB().pipe(
          map(data => TeacherActions.loadTeachersSuccess({ data })),
          catchError(error => of(TeacherActions.loadTeachersFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      //solo filtro aquellas acciones que sean ded tipo saleactions.loadsales
      ofType(TeacherActions.loadCourseOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCourseOptions().pipe(
          map(data => TeacherActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(TeacherActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });

  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActions.createTeacher),
      concatMap((action) =>
        this.createTeacher(action.payload).pipe(
          map(data => TeacherActions.createTeacherSuccess({ data })),
          catchError(error => of(TeacherActions.createTeacherFailure({ error }))))
      )
    );
  });

  createTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeacherActions.createTeacherSuccess),
      map(() => this.store.dispatch(TeacherActions.loadTeachers()))

    );
  }, { dispatch: false });





  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) { }

  private getTeachersFromDB(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(environment.baseApiUrl + '/teachers')
  }

  private createTeacher(payload: CreateTeacherPayload): Observable<Teacher> {
    return this.httpClient.post<Teacher>(environment.baseApiUrl + '/teachers', payload)
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses');
  }


}

