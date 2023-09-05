import { createFeature, createReducer, on } from '@ngrx/store';
import { TeacherActions } from './teacher.actions';
import { Teacher } from '../models';
import { Course } from '../../courses/models';

export const teacherFeatureKey = 'teacher';

export interface State {
  data: Teacher[];
  teacherNameInput: Teacher[];
  courseOptions: Course[];
  error: unknown;
}

export const initialState: State = {
  data: [],
  teacherNameInput: [],
  courseOptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,

  //load teachers

  on(TeacherActions.loadTeachers, state => {
    return {
      ...state
    }
  }),

  on(TeacherActions.loadTeachersSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
    }
  }),

  on(TeacherActions.loadTeachersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),


  //load courses options 
  on(TeacherActions.loadCourseOptions, (state) => state),
  on(TeacherActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data,
    }
  }),
);

export const teacherFeature = createFeature({
  name: teacherFeatureKey,
  reducer,
});

