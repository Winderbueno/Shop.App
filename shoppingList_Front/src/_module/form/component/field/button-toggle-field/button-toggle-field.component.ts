﻿//#region Angular, Material, NgRx
import { Component } from '@angular/core';
//#endregion

//#region Component, Model, Service
import { MultipleOptionFieldComponent } from '@form/component';
//#endregion


/**
 * Button Toggle Field Component
 */
@Component({
  selector: 'app-button-toggle-field',
  templateUrl: 'button-toggle-field.component.html' })
export class ButtonToggleFieldComponent extends MultipleOptionFieldComponent {
  ngOnInit() {
    this.required = false;
    super.ngOnInit();
  }
}