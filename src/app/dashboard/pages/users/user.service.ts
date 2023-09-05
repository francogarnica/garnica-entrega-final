import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './components/models';
import { BehaviorSubject, Observable, Subject, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sendNotification$ = new Subject<string>();

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private notifier: NotifierService, private httpClient: HttpClient) {
    this.sendNotification$.subscribe({
      next: (message) => alert(message),
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    // USER_DB.subscribe({
    //   next: (usuariosFromDb) => this._users$.next(usuariosFromDb)
    // })
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({
        'token': '12345678910'
      }),
      // params: {
      //   page: 1,
      //   limit: 50,
      // }
    }).subscribe({
      next: (response) => {
        console.log('RESPONSE: ', response)
        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los usuarios')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }


  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.users$.pipe(
      take(1),
      map((users) => users.find((u) => u.id === id)),
    )
  }

  createUser(payload: CreateUserData): void {
    //TAKE 1 = solo quiero recibir una emision
    // this.users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next([...arrayActual, { ...user, id: arrayActual.length + 1 }]);
    //     this.notifier.showSuccess('Usuario creado');
    //   }
    // })

    const token = generateRandomString(20);

    //CON HTPP CLIENT:
    this.httpClient.post<User>(environment.baseApiUrl + '/users', { ...payload, token })
      .pipe(
        mergeMap((userCreate) => this.users$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, userCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);

        }
      })
  }

  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    // this.users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next(
    //       arrayActual.map((u) => u.id === id ? { ...u, ...usuarioActualizado } : u
    //       )
    //     );
    //     this.notifier.showSuccess('Usuario actualizado')
    //   },
    // });

    //CON HTTP CLIENT

    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: () => this.loadUsers(),
    })
  }


  deleteUserById(id: number): void {
    // this._users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next(arrayActual.filter((u) => u.id !== id));
    //     this.notifier.showSuccess('Usuario eliminado')
    //   },
    // });

    //LOGICA ESPERADA: 1- QUIERO COMUNICARME CON LA API Y ELIMINAR EL USUARIO, 2- ACTUALIZAR EL LISTADO 

    //OBSERVABLE 1 (se comunica con la api)
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id)
      .pipe(
      // mergeMap(
      //   //En este punto la comunicacion ya sucedio. Punto 1
      //   (responseUserDelete) => this.users$.pipe(
      //     take(1),
      //     map((arrayActual) => arrayActual.filter((u) => u.id !== id)) //En este punto del codigo ya actualizamos el array. PUNTO 2
      //   )
      // )
    ).subscribe({
      //next: (arrayActualizado) => this._users$.next(arrayActualizado),
      next: (arrayActualizado) => this.loadUsers(),
    })


    //OBSERVABLE 2 
    // this.users$.pipe(take(1))
  }

}
