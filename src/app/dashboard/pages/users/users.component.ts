import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './components/models';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  public users: Observable<User[]>;
  public isLoading$: Observable<boolean>;
  public destroyed = new Subject<boolean>();

  public loading = false;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
  ) {
    this.userService.loadUsers();
    this.isLoading$ = this.userService.isLoading$;
    this.users = this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.userService.createUser({
            name: v.name,
            email: v.email,
            password: v.password,
            surname: v.surname,
            role: v.role,
          });
          Swal.fire(
            'Usuario Agregado',
            '',
            'success'
          )
        }
      }


    })


  }

  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      Swal.fire(
        'Usuario Eliminado',
        '',
        'error'
      )
      this.userService.deleteUserById(userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
      data: userToEdit
    });

    dialogRef.afterClosed().subscribe({
      next: (userUpdated) => {
        if (userUpdated) {
          this.userService.updateUserById(userToEdit.id, userUpdated);
        }
      },
    });
  }

}
