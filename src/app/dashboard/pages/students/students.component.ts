import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentService } from './services/student.service';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: []
})
export class StudentsComponent implements OnInit, OnDestroy {
  students$: Observable<Student[]>;
  public isAdmin$: Observable<boolean>;
  displayedColumns = ['id', 'name', 'surname', 'email', 'actions'];

  constructor(private studentsService: StudentService, private dialog: MatDialog, private store: Store) {
    this.students$ = this.studentsService.students$;
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnDestroy(): void {
    this.studentsService.clearStudents();
  }

  ngOnInit(): void {
    this.studentsService.loadStudents();
  }

  onCreate(): void{
    this.dialog.open(StudentDialogComponent);
  }
  
  onDelete(id: number): void{
    this.studentsService.deleteStudentById(id);
  }

}
