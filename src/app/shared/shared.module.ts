import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { AgrandadoDirective } from './directives/agrandado.directive';
import { MatSelectModule } from '@angular/material/select'



@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagePipe,
    AgrandadoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    FullNamePipe,
    ControlErrorMessagePipe,
    AgrandadoDirective,
    MatSelectModule,
  ]
})
export class SharedModule { }
