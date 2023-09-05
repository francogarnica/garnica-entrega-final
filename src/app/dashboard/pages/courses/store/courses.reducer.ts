import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models';


export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[],
  error: unknown,
}

export const initialState: State = {
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  //loadCourses

  on(CoursesActions.loadCourses, state => {
    return {
      ...state,
    }
  }),

  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
    }
  }),

  on(CoursesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),


);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

