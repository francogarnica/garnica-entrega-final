import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesTableComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    
  ]
})
export class CoursesModule { }
