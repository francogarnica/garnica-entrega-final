import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';


@NgModule({
  declarations: [
    StudentsComponent, StudentDialogComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule
  ],
})
export class StudentsModule { }
