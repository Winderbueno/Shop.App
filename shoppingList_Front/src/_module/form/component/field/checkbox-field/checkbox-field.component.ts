﻿//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { requiredTrue } from 'ngrx-forms/validation';
//#endregion

//#region Component, Model, Service
import { FieldComponent } from '../field.component';
//#endregion


/**
 * CheckBox Field Component
 */
@Component({
  selector: 'k-form-field-checkbox[ctrlName]',
  templateUrl: 'checkbox-field.component.html'
})
export class CheckBoxFieldComponent extends FieldComponent {

  ngOnInit() {
    if(this.required === true) { super.validationFns.push(requiredTrue); }
    super.ngOnInit();
  }
}
