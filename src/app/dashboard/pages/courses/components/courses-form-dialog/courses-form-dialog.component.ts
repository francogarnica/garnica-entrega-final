import { Component, Inject } from '@angular/core';
import { Course } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styleUrls: ['./courses-form-dialog.component.scss']
})
export class CoursesFormDialogComponent {
  editingCourse?: Course;
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

  constructor(private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course,
  ) {
    if (this.data) {
      this.editingCourse = this.data;
      this.nameControl.setValue(this.data.name);
      this.priceControl.setValue(this.data.price);
      this.descriptionControl.setValue(this.data.description);
      this.durationControl.setValue(this.data.duration);
    }
  }


  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
