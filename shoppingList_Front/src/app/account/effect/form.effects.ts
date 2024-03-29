//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
//#endregion

//#region Module
import * as fromForm from '@form/store';
//#endregion

//#region This
import * as fromAPI from '../service/account.api.actions';
import * as fromStore from '../store';
//#endregion


@Injectable()
export class FormEffects {

  // TODO - Logout should clean all 'Logged only accessible' form
  cleanForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAPI.logoutSuccessAction,
        fromAPI.logoutFailureAction,
        fromStore.logoutAction,
        fromStore.autoLogoutAction
      ),
      map(() => fromForm.deleteFormAction({ formIds: ['ShoppingListActions', 'Add Product'] }))
    )
  );

  constructor(private actions$: Actions) {}
}
