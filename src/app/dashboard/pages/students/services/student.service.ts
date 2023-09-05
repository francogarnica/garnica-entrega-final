import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CreateStudentPayload, Student } from "../models";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class StudentService {
    private _students$ = new BehaviorSubject<Student[]>([]);
    private readonly baseUrl = environment.baseApiUrl + '/students';
    public students$ = this._students$.asObservable();

    constructor(private httpClient: HttpClient) { }

    loadStudents(): void {
        this.httpClient.get<Student[]>(this.baseUrl).subscribe({
            next: (students) => {
                this._students$.next(students); //EMITIR LOS DATOS AL BEHAVIOR SUBJECT 
            },
            error: () => {
                //Manejar error al cargar los compradores
            }
        });
    }

    createStudent(payload: CreateStudentPayload, afterCreate?: () => void): void {
        this.httpClient.post<Student>(this.baseUrl, payload).subscribe({
            next: () => {
                this.loadStudents(); //RECARGAR EL LISTADO DESPUES DE CREAR UNO NUEVO
                if (afterCreate) afterCreate();
            },
            error: () => {
                //manejar error al cargar los compradores
            },
        });
    }

    deleteStudentById(id: number): void {
        this.httpClient.delete(this.baseUrl + '/' + id).subscribe({
            next: () => {
                this.loadStudents(); //Recargar el listado despues de eliminar uno
            },
            error: () => {
                //manejar error al cargar los compradores
            }
        });
    }

    clearStudents(): void {
        this._students$.next([]);
    }
}