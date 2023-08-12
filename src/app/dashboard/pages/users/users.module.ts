import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserService } from './user.service';
import { UserMockService } from './mocks/user-mock.service';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
    UsersTableComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    // {
    //   provide: UserService,
    //   useClass: UserMockService,
    // },
    {
      provide: 'IS_DEV',
      useValue: true,
    },
    // {
    //   provide: UserService,
    //   useFactory: (authService: AuthService) => {
    //     const isAdmin = authService.authUser.role === 'ADMIN';
    //     return isAdmin ? new UserMockService() : new UserService()
    //   },
    //   deps: [
    //     AuthService
    //   ]
    // },
  ],
})
export class UsersModule { }
