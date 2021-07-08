//#region Angular, Material, RxJS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app_shared/module/material.module';
//#endregion

//#region App Module
import { AppRoutingModule } from '@app/app-routing.module';
//#endregion

//#region Declared Component
import { FooterComponent } from '@app_layout/component/footer/footer.component';
import { NgHomeComponent } from '@app/_layout/component/ng-home/ng-home.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
//#endregion


@NgModule({
  imports: [
    // Angular, Material Module
    CommonModule,
    MaterialModule,

    // App Module
    AppRoutingModule,

  ],
  declarations: [
    ToolbarComponent,
    FooterComponent,
    NgHomeComponent,
  ],
  exports: [
    ToolbarComponent,
    FooterComponent,
    NgHomeComponent,
  ]
})
export class LayoutModule { }
