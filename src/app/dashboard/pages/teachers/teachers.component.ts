import { Component, OnInit} from '@angular/core';
import { Teacher } from './models';
import { TeacherService } from './teacher.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { selectTeachers } from './store/teacher.selectors';
import { TeacherActions } from './store/teacher.actions';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styles: [
  ]
})
export class TeachersComponent implements OnInit{


  public dataSource: Teacher[] = [];

  teachers$: Observable<Teacher[]>;

  public isAdmin$: Observable<boolean>;

  public displayedColumns = ['id', 'name', 'surname', 'email', 'actions'];


  constructor(private store: Store, private matDialog: MatDialog, private teachersService: TeacherService) {
    this.teachers$ = this.store.select(selectTeachers);
    this.isAdmin$ = this.store.select(selectIsAdmin);

  }

  onAdd(): void {
    this.matDialog.open(TeacherDialogComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(TeacherActions.loadTeachers())
  }

  onDelete(id: number): void {
    this.teachersService.deleteTeacherById(id);
    
  }

}
