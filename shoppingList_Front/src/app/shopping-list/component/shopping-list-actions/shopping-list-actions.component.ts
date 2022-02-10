//#region Angular, Material, NgRx
import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
//#endregion

//#region App Component, Model
import { FormComponent } from '@form/component';
import * as ComponentActions from './shopping-list-actions.actions';
import * as fromForm from '@form/store/';
//#endregion


@Component({ 
  selector: 'shopping-list-actions',
  templateUrl: './shopping-list-actions.component.html'
})
export class ShoppingListActionComponent extends FormComponent {

  @ViewChild('accordion',{static:false}) Accordion!: MatAccordion;

  // View Status
  readonly editMode$=this.store.select(fromForm.selectControlValue('ShoppingListActions','EditMode'));
  accordion_expanded = false;

  ngOnInit(){
    super.formId = "ShoppingListActions";
    super.ngOnInit();
  }

  /** For all shoppingList product, reset 'bought' status */
  resetBoughtStatus(): void {
    // ResetBoughtStatus
    this.store.dispatch(ComponentActions
      .resetBoughtStatusAction({ ShoppingListId: "1" }));
  }

  /** Add Product Button */
  openAddProductDialog(): void { // TODO
    this.store.dispatch(ComponentActions.clickOnAddProductButtonAction());
  }

  toggleAccordeon():void {
    this.accordion_expanded === false ?
      this.Accordion.openAll() :
      this.Accordion.closeAll();
    this.accordion_expanded = !this.accordion_expanded;
  }
}
