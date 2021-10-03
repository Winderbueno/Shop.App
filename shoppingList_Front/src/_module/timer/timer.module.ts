//#region Angular, Material, NgRx
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//#endregion

//#region Store
import * as fromStore from './store/';
//#endregion

//#region Effect
import { TimerEffects } from './effect/';
//#endregion


@NgModule({
  imports: [
    /* Store */
    StoreModule.forFeature(fromStore.featureKey, fromStore.reducer),

    /* Effect */
    EffectsModule.forFeature([TimerEffects]),
  ],
  declarations: []
})
export class TimerModule { }
