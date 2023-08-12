import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from './models';
import { CourseService } from './course.service';
import { Observable, Subject } from 'rxjs';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent implements OnDestroy {
  public courses: Observable<Course[]>;
  public destroyed = new Subject<boolean>();

  constructor(private matDialog: MatDialog, private courseService: CourseService) {
    this.courseService.loadCourses();
    this.courses = this.courseService.getCourses();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateCourse(): void {
    const dialogRef = this.matDialog.open(CoursesFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.courseService.createCourse({
            name: v.name,
            price: v.price,
            description: v.description,
            duration: v.duration

          });
        }
      }
    })
  }

  onDeleteCourse(courseToDelete: Course): void {
    if (confirm(`¿Está seguro de eliminar a ${courseToDelete.name}?`)) {
      this.courseService.deleteCourseById(courseToDelete.id);
    }
  }

  onEditCourse(courseToEdit: Course): void {
    const dialogRef = this.matDialog.open(CoursesFormDialogComponent, {
      data: courseToEdit
    });

    dialogRef.afterClosed().subscribe({
      next: (courseUpdated) => {
        if (courseUpdated) {
          this.courseService.updateCourseById(courseToEdit.id, courseUpdated);
        }
      },
    });
  }

}
