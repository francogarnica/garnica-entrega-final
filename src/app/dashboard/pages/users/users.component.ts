import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './components/models';

const ELEMENT_DATA: User[] = [
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
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA;


  constructor(
    private matDialog: MatDialog
  ){}

  onCreateUser(): void{
    const dialogRef = this.matDialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.users = [
            ...this.users,
            {
              id: this.users.length + 1,
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname
            },
          ];
          console.log('Recibimos el valor: ', v);
        } else {
          console.log('Se cancelo');
        }
        
      }
    })

  }

  onDeleteUser(userToDelete: User): void{
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void{
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
      data: userToEdit
    });

    dialogRef.afterClosed().subscribe({
      next: (userUpdated) => {
        console.log(userUpdated);
        if (userUpdated) {
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id
              ? {...user,...userUpdated}
              : user
          }); 
        }
      }
    })
  }

}
