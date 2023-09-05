import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from './models';
import { CourseService } from './course.service';
import { Observable, Subject } from 'rxjs';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { selectCoursesArray } from './store/courses.selectors';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent implements OnInit {

  public dataSource: Course[] = [];

  courses$: Observable<Course[]>;

  public isAdmin$: Observable<boolean>;

  displayedColumns = ['id', 'name', 'price', 'description', 'duration', 'actions']

  constructor(private store: Store, private matDialog: MatDialog, private coursesService: CourseService) {
    this.courses$ = this.store.select(selectCoursesArray);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }


  

  onAdd(): void {
    this.matDialog.open(CoursesFormDialogComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }


  onDelete(id: number): void {
    this.coursesService.deleteCourseById(id);

  }

}

