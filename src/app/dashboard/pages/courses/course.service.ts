import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';
import { Course, CreateCourseData, UpdateCourseData } from './models';
import { NotifierService } from 'src/app/core/services/notifier.service';

const COURSE_DB: Observable<Course[]> = of([
  {
    id: 1,
    name: 'Ilustracion Digital',
    price: 35000,
    description: 'lorem ipsum',
    duration: '12 semanas',
  },
  {
    id: 2,
    name: 'Python',
    price: 40000,
    description: 'lorem ipsum',
    duration: '15 semanas',
  },
  {
    id: 3,
    name: 'Desarrollo Web',
    price: 42000,
    description: 'lorem ipsum',
    duration: '14 semanas',
  },
]).pipe(delay(1000));


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private sendNotification$ = new Subject<string>();
  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();

  constructor(private notifier: NotifierService) {
    this.sendNotification$.subscribe({
      next: (message) => alert(message),
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadCourses(): void {
    COURSE_DB.subscribe({
      next: (cursosFromDb) => this._courses$.next(cursosFromDb)
    })
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.courses$.pipe(
      take(1),
      map((courses) => courses.find((u) => u.id === id)),
    )
  }


  createCourse(course: CreateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next([...arrayActual, { ...course, id: arrayActual.length + 1 }]);
        this.notifier.showSuccess('Curso creado');
      }
    });
  }

  updateCourseById(id: number, cursoActualizado: UpdateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(
          arrayActual.map((u) => u.id === id ? { ...u, ...cursoActualizado } : u
          )
        );
        this.notifier.showSuccess('Curso actualizado')
      },
    });
  }

  deleteCourseById(id: number): void {
    this._courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(arrayActual.filter((c) => c.id !== id));
        this.notifier.showSuccess('Curso eliminado')
      }
    })
  }

}
