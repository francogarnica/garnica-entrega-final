import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { InscriptionActions } from '../../store/inscription.actions';
import { selectCourseOptions, selectStudentOptions } from '../../store/inscription.selectors';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styles: [
  ]
})
export class InscriptionDialogComponent {
  courseIdControl = new FormControl(null, Validators.required);
  studentIdControl = new FormControl(null, Validators.required);

  inscriptionForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl,
  });

  studentOptions$: Observable<Student[]>;
  courseOptions$: Observable<Course[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscriptionDialogComponent>) {
    this.studentOptions$ = this.store.select(selectStudentOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadCourseOptions());
    this.store.dispatch(InscriptionActions.loadStudentOptions());
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionActions.createInscription({ payload: this.inscriptionForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
