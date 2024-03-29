//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';
//#endregion

//#region Action
import * as fromStore from '../store';
import { AccountService } from '@account/service/account.service'; // TODO - Should be a token Service
//#endregion


@Injectable()
export class TokenEffects {

  validateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromStore.validateTokenAction),
      exhaustMap((action) => {

        // TODO - BACK -> Only 1 method for Token Validation
        if(action.token.tokenId === "Reset Password")
          return this.accountService.validateResetToken(action.token.value).pipe(
            map(() => fromStore.tokenValidatedAction({ tokenId : action.token.tokenId })),
            catchError(() => of(fromStore.tokenInvalidatedAction({ tokenId : action.token.tokenId })))
          );
        else {
          return this.accountService.verifyEmail(action.token.value).pipe(
            map(() => fromStore.tokenValidatedAction({ tokenId : action.token.tokenId })),
            catchError(() => of(fromStore.tokenInvalidatedAction({ tokenId : action.token.tokenId })))
          );
        }
      })
  ));


  constructor(
    private actions$: Actions,
    private accountService: AccountService,
  ) { }
}
