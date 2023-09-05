import { Component, Inject } from "@angular/core";
import { Student } from "../../models";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StudentService } from "../../services/student.service";

@Component({
    selector: 'app-student-dialog',
    templateUrl: './student-dialog.component.html',
    styles: [],
})
export class StudentDialogComponent {
    editingStudent?: Student;
    nameControl = new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
    ]);

    surnameControl = new FormControl<string | null>(null, [Validators.required]);
    emailControl = new FormControl<string | null>(null, [Validators.required]);

    studentForm = new FormGroup({
        name: this.nameControl,
        surname: this.surnameControl,
        email: this.emailControl,
    });

    constructor(
        private dialogRef: MatDialogRef<StudentDialogComponent>,
        private studentService: StudentService,
        @Inject(MAT_DIALOG_DATA) private data?: Student
    ) {
        if (this.data) {
            this.editingStudent = this.data;
            this.nameControl.setValue(this.data.name);
            this.surnameControl.setValue(this.data.surname);
            this.emailControl.setValue(this.data.email);
        }
    }

    onSubmit(): void {
        if (this.studentForm.invalid) {
            this.studentForm.markAllAsTouched();
        } else {
            this.studentService.createStudent(this.studentForm.getRawValue(), () => {
                this.dialogRef.close(this.studentForm.value);
            })
        }
    }
}