//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
//#endregion

//#region Module
import * as fromAlert from '@alert/store';
//#endregion

//#region This
import * as fromAPI from '../service/account.api.actions';
import * as fromComponent from '../component';
import * as fromStore from '../store';
//#endregion


@Injectable()
export class AlertEffects {

  triggerErrorAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAPI.loginFailureAction,
        fromAPI.logoutFailureAction,
        fromAPI.registerFailureAction,
        fromAPI.forgotPasswordFailureAction,
        fromAPI.registerFailureAction,
        fromAPI.resetPasswordFailureAction
      ),
      map((action) => fromAlert.triggerAlertAction({
        alertType: fromAlert.AlertTypeEnum.Error,
        message: action.error,
        keepAfterRouteChange: false
      }))
    )
  );

  triggerAutoLogoutAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromStore.autoLogoutAction),
      map(() => fromAlert.triggerAlertAction({
        alertType: fromAlert.AlertTypeEnum.Error,
        message: "You've been disconnected",
        keepAfterRouteChange: true
      }))
    )
  );

  triggerSuccessAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAPI.resetPasswordSuccessAction,
        fromAPI.registerSuccessAction,
        fromAPI.forgotPasswordSuccessAction,
        fromComponent.emailTokenValidatedAction
      ),
      map((action) => fromAlert.triggerAlertAction({
        alertType: fromAlert.AlertTypeEnum.Success,
        message: action.message,
        keepAfterRouteChange: true
      }))
    )
  );

  constructor(
    private actions$: Actions
  ) { }
}
