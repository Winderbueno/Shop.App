//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, filter } from 'rxjs/operators';
//#endregion

//#region Action
import * as fromAlert from '@alert/store';
import * as fromForm from '@form/store';
import * as fromTimer from '@timer/store';
//#endregion


@Injectable()
export class AlertEffects {

  // On valid submit of FormDemo Form, throw success alert
  triggerAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromForm.formValidatedAction),
      filter((action) => action.formId === 'Form'),
      map(() =>
        fromAlert.triggerAlertAction({
          alertType: fromAlert.AlertTypeEnum.Success,
          message: "Valid Form Submitted !",
          keepAfterRouteChange: false
        })
      )
    )
  );

  alertDemoTriggerAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTimer.timerEndedAction),
      filter((action) => action.timerId === 'Alert'),
      withLatestFrom(this.store.select(fromForm.selectFormValue('Alert'))),
      map(([, formValue]) =>
        fromAlert.triggerAlertAction({
          alertType: formValue.Criticity as fromAlert.AlertTypeEnum,
          message: formValue.Message as string,
          keepAfterRouteChange: formValue.KeepAfterRouteChange as boolean
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
