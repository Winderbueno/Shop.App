//#region Angular, Material, NgRx
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
//#endregion

//#region NgRx
import { Store } from '@ngrx/store';
import * as ComponentActions from './shopping-list.actions';
import * as ShoppingListSelector from '@app_shoppingList/_store/shopping-list.selectors';
//#endregion

//#region App Component, Model
import { ShoppingList } from '@app_model/shopping-list.model';
import { UsedProduct } from '@app_model/used-product.model';
import { DialogAddProductComponent } from '@app/shopping-list/component/dialog-add-product/dialog-add-product.component';
//#endregion


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

  @ViewChild('accordion',{static:false}) Accordion!: MatAccordion;

  // View Status
  edit_mode = false;
  accordion_expanded = false;

  // Shopping List
  myShoppingList!: ShoppingList[];

  constructor(
    public dialog: MatDialog,
    private store: Store
  ) {
    this.store.select(ShoppingListSelector.getActive).subscribe(value => this.myShoppingList=value);
  }

  ngOnInit(): void {
    // Dispatch a Load Active Shopping List action
    this.store.dispatch(
      ComponentActions.loadActive()
    );
  }

  /** For all shoppingList product, reset 'bought' status */
  resetBoughtStatus(): void {

    // Dispatch a ResetBoughtStatus action
    this.store.dispatch(
      ComponentActions.resetBoughtStatus(
        { ShoppingListId: "1" }
      ));

  }

  /** Add Product Button */
  openAddProductDialog(): void {

    // Open addProductDialog
    const addProductDialog = this.dialog
      .open(DialogAddProductComponent, { width: '400px' });

    // After dialog closing, refresh the active shoppingList
    // TODO - NgRx
    /*addProductDialog
      .afterClosed()
      .subscribe(() => {
        this.shoppingListService
          .getActive()
          .subscribe();
      });*/
  }

  /** For clicked product, swap 'bought' status value */
  swapProductBoughtStatus(prod: UsedProduct): void {

    // Swap 'bought' status value
    if(prod) prod.bought ? prod.bought=false : prod.bought = true;

    // Dispatch an Update Product action
    // TODO - NgRx
    /*this.store.dispatch(
      ShopListPageActions.updtProduct({
        ShoppingListId: this.myShoppingList.shoppingListId,
        Product: prod
      })
    );*/
  }

  /** For clicked product, swap 'bought' status value */
  deleteProduct(prod: UsedProduct): void {

    // Dispatch a Delete Product action
    // TODO - NgRx
    /*this.store.dispatch(
      ShopListPageActions.deleteProduct({
        ShoppingListId: this.myShoppingList.shoppingListId,
        ProductId : prod.usedProductId.toString()
      }));*/
  }

  onSlideChange():void {
    if(this.accordion_expanded == false){
      this.Accordion.openAll();
    } else {
      this.Accordion.closeAll();
    }
    this.accordion_expanded = !this.accordion_expanded;
  }
}