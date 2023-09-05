import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { inscriptionFeature } from './store/inscription.reducer';
import { StoreModule } from '@ngrx/store';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';


@NgModule({
  declarations: [InscriptionsComponent, InscriptionDialogComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects])
  ]
})
export class InscriptionsModule { }
