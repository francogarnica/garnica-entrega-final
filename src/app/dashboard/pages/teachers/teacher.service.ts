import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Teacher } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private _teachers$ = new BehaviorSubject<Teacher[]>([]);
  public teachers$ = this._teachers$.asObservable();
  private readonly baseUrl = environment.baseApiUrl + '/teachers';

  constructor(private httpClient: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this._teachers$.asObservable();
  }

  loadTeachers(): void {
    this.httpClient.get<Teacher[]>(this.baseUrl).subscribe({
      next: (teachers) => {
        this._teachers$.next(teachers); //EMITIR LOS DATOS AL BEHAVIOR SUBJECT 
      },
      error: () => {
        //Manejar error al cargar los compradores
      }
    });
  }

  deleteTeacherById(id: number): void {
    this.httpClient.delete(this.baseUrl + '/' + id).subscribe({
      next: () => {
        this.loadTeachers();
        window.location.reload(); //Recargar el listado despues de eliminar uno
      },
      error: () => {
        //manejar error al cargar los compradores
      }
    });
  }

}
