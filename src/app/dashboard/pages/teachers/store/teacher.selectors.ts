import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeacher from './teacher.reducer';

export const selectTeacherState = createFeatureSelector<fromTeacher.State>(
  fromTeacher.teacherFeatureKey
);

export const selectTeachers = createSelector(selectTeacherState, (state) => state.data)

export const inputTeacherName = createSelector(selectTeacherState, (state) => state.teacherNameInput)

export const selectCourseOptions = createSelector(selectTeacherState, (state) => state.courseOptions)
