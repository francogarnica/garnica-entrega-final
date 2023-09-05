import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { coursesFeature } from './store/courses.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects]),

  ]
})
export class CoursesModule { }
