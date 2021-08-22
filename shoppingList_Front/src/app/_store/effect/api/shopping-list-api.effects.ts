//#region Angular & Material
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
//#endregion

//#region NgRx
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ShoppingListAPIActions from '@app/_service/action/shopping-list.api.actions';
import * as ShoppingListComponentActions from '@app_shoppingList/shopping-list/shopping-list.actions';
//#endregion

//#region App Service
import { ShoppingListService } from '@app_service/shopping-list.service';
import { ShoppingList } from '@app_model/shopping-list.model';
//#endregion


@Injectable()
export class ShoppingListAPIEffects {

  // Load user's active shoppingList from server
  getActive$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingListComponentActions.loadActive),

    switchMap(() =>
      this.shoppingListService.getActive().pipe(
        map((sl: ShoppingList) => ShoppingListAPIActions.loadActiveSuccess({ shoppingList: sl })),
        catchError((error) => of(ShoppingListAPIActions.loadActiveFailure({ error: error })))
      )
    )
  )
  );

  //{ shoppingList: shoppingList }
  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService
  ) { }
}