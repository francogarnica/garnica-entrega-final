import { Component, Inject } from '@angular/core';
import { Course } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesActions } from '../../store/courses.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styleUrls: []
})
export class CoursesFormDialogComponent {
  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
  priceControl = new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(99999)]);
  descriptionControl = new FormControl<string | null>(null, [Validators.required]);
  durationControl = new FormControl<string | null>(null, [Validators.required]);

  courseForm = new FormGroup({
    name: this.nameControl,
    price: this.priceControl,
    description: this.descriptionControl,
    duration: this.durationControl
  });

  constructor(private store: Store, private matDialogRef: MatDialogRef<CoursesFormDialogComponent>) {
    
  }

  ngOnInit(): void{
    this.store.dispatch(CoursesActions.loadCourses());
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.store.dispatch(CoursesActions.createCourse({ payload: this.courseForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
