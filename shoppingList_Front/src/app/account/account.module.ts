//#region Angular, Material, NgRx
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//#endregion

//#region Module
import { AccountRouterModule } from './router.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormModule } from '@form/form.module';
import { MaterialModule } from '@material/material.module';
//#endregion

//#region This
import * as Components from './component';
import * as Effects from './effect';
import * as Pages from './page';
import * as fromStore from './store';
//#endregion


@NgModule({
  imports: [
    /* Angular */
    CommonModule,

    /* Module */
    AccountRouterModule,
    FlexLayoutModule,
    FormModule,
    MaterialModule,

    /* Store */
    StoreModule.forFeature(
      fromStore.featureKey, 
      fromStore.reducer
    ),

    /* Effect */
    EffectsModule.forFeature(
      Effects.Effects
    ),
  ],
  declarations: [
    Pages.HomePage,
    Components.Components
  ]
})
export class AccountModule {}