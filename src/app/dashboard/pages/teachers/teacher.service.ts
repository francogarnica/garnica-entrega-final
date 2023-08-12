import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Teacher } from './models';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachers$ = new BehaviorSubject<Teacher[]>([]);

  constructor() { }

  getTeachers(): Observable<Teacher[]> {
    return this.teachers$.asObservable();
  }

  loadTeachers(): void {
    this.teachers$.next([
      {
        id: 1,
        name: 'Franco',
        surname: 'Garnica',
        email: 'franco.garnica@yahoo.com'
      },
      {
        id: 2,
        name: 'Gonzalo',
        surname: 'Banzas',
        email: 'gobanzas@yahoo.com'
      }

    ])
  }

  create(): void {
    this.teachers$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        arrayActual.push({
          id: arrayActual.length + 1,
          name: 'Random name',
          surname: 'Random surname',
          email: 'random@email',
        });

        this.teachers$.next([...arrayActual]);
      }
    })
  }

  deleteById(id: number): void {
    this.teachers$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.teachers$.next(arrayActual.filter((p) => p.id !== id));
      }
    })
  }
}
