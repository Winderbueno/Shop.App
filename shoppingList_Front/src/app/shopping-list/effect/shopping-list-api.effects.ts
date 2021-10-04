//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
//#endregion

//#region Action, Selector
import * as fromAPI from '../service/shopping-list.api.actions';
import * as fromComponent from '../component/';
//#endregion

//#region Service, Model
import { ShoppingListService } from '../service/shopping-list.service';
import { ShoppingList } from '../model/shopping-list.model';
//#endregion


@Injectable()
export class ShoppingListAPIEffects {

  // Load user's active shoppingList from server
  getActive$ = createEffect(() => this.actions$.pipe(
    ofType(
      fromComponent.loadActiveAction
    ),
    switchMap(() =>
      this.shoppingListService.getActive().pipe(
        map((sl: ShoppingList) => fromAPI.loadActiveSuccessAction({ shoppingList: sl })),
        catchError((error) => of(fromAPI.loadActiveFailureAction({ error: error })))
      )
    )
  )
  );

  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService
  ) { }
}