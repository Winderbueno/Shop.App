//#region Angular & Material
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
//#endregion

//#region NgRx
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountAPIActions from '@app_action/api/account.api.actions';
import { forgotPasswordSubmit } from '@app_account/forgot-password/forgot-password.actions';
//#endregion

//#region App Service
import { AccountService } from '@app_service/account.service';
//#endregion


@Injectable()
export class ForgotPasswordEffects {

  /* Call forgotPassword */
  forgotPassword$ = createEffect(() => this.actions$.pipe(
    ofType(forgotPasswordSubmit),

    exhaustMap((action) =>
      this.accountService.forgotPassword(action.email)
        .pipe(
          /* TODO_NGRX
            next: () => this.alertService.success('Please check your email for password reset instructions'),
          */
          map(() => AccountAPIActions.forgotPasswordSuccess()),
          catchError((error) => of(AccountAPIActions.forgotPasswordFailure({ error: error })))
        )
    )
  ));

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) { }
}
