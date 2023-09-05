import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from './models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private _courses$ = new BehaviorSubject<Course[]>([]);
  public courses$ = this._courses$.asObservable();
  private readonly baseUrl = environment.baseApiUrl + '/courses';

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this._courses$.asObservable();
  }

  loadCourses(): void {
    this.httpClient.get<Course[]>(this.baseUrl).subscribe({
      next: (courses) => {
        this._courses$.next(courses); //EMITIR LOS DATOS AL BEHAVIOR SUBJECT 
      },
      error: () => {
        //Manejar error al cargar los compradores
      }
    });
  }

  deleteCourseById(id: number): void {
    this.httpClient.delete(this.baseUrl + '/' + id).subscribe({
      next: () => {
        this.loadCourses();
        window.location.reload(); //Recargar el listado despues de eliminar uno
      },
      error: () => {
        //manejar error al cargar los compradores
      }
    });
  }

}
