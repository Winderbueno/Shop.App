//#region Angular, Material, RxJS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app_shared/module/material.module';
//#endregion

//#region App Module
import { SharedModule } from '@app_shared/shared.module';
//#endregion

//#region Declared Component
import { DialogAddProductComponent,
  ShoppingListComponent } from './component/';
//#endregion

@NgModule({
  imports: [
    // Angular, Material Module
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    // App Module
    SharedModule
  ],
  declarations: [
    ShoppingListComponent,
    DialogAddProductComponent
  ],
  entryComponents: [ // Component Instantiated at runtime
    DialogAddProductComponent
  ],
})
export class ShoppingListModule { }
