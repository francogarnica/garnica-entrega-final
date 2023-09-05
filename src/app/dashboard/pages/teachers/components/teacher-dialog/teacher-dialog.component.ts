import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Teacher } from '../../models';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { inputTeacherName, selectCourseOptions } from '../../store/teacher.selectors';
import { TeacherActions } from '../../store/teacher.actions';
import { Course } from '../../../courses/models';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: []
})
export class TeacherDialogComponent {
  nameControl = new FormControl(null, Validators.required);
  surnameControl = new FormControl(null, Validators.required);
  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  courseIdControl = new FormControl(null, Validators.required)

  TeacherForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    courseId: this.courseIdControl
  })

  nameInput$: Observable<Teacher[]>;
  courseOptions$: Observable<Course[]>;


  constructor(private store: Store, private matDialogRef: MatDialogRef<TeacherDialogComponent>) {
    this.nameInput$ = this.store.select(inputTeacherName);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(TeacherActions.loadCourseOptions());
  }

  onSubmit(): void {
    if (this.TeacherForm.invalid) {
      this.TeacherForm.markAllAsTouched();
    } else {
      this.store.dispatch(TeacherActions.createTeacher({ payload: this.TeacherForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
