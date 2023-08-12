import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './components/models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    name: 'Marcos',
    surname: 'Rojo',
    email: 'marcosrojo@mail.com',
    password: '123456',
  },
  {
    id: 2,
    name: 'Federico',
    surname: 'Valverde',
    email: 'fedeverde@mail.com',
    password: 'abc123',
  },
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sendNotification$ = new Subject<string>();

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();


  constructor(private notifier: NotifierService) {
    this.sendNotification$.subscribe({
      next: (message) => alert(message),
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb)
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

  createUser(user: CreateUserData): void {
    //TAKE 1 = solo quiero recibir una emision
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([...arrayActual, { ...user, id: arrayActual.length + 1 }]);
        this.notifier.showSuccess('Usuario creado');
      }
    })
  }

  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((u) => u.id === id ? { ...u, ...usuarioActualizado } : u
          )
        );
        this.notifier.showSuccess('Usuario actualizado')
      },
    });
  }


  deleteUserById(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(arrayActual.filter((u) => u.id !== id));
        this.notifier.showSuccess('Usuario eliminado')
      },
    });
  }

}
