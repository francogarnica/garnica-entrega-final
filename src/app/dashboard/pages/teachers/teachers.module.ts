import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TeacherEffects } from './store/teacher.effects';
import { teacherFeature } from './store/teacher.reducer';
import { StoreModule } from '@ngrx/store';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';


@NgModule({
  declarations: [
    TeachersComponent,
    TeacherDialogComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule,
    StoreModule.forFeature(teacherFeature),
    EffectsModule.forFeature([TeacherEffects]),
  ]
})
export class TeachersModule { }
