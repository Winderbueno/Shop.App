﻿//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { NgrxValueConverter } from 'ngrx-forms';
//#endregion

//#region Component, Model, Service
import { FieldComponent } from '@form/component/';
import { DateTime } from 'luxon';
//#endregion


/**
 * Date Field Component
 */
@Component({
  selector: 'app-date-field',
  templateUrl: 'date-field.component.html' })
export class DateFieldComponent extends FieldComponent {

  ngOnInit() { super.ngOnInit(); }

  // Converters 'Luxon DateTime' (In DatePicker) <=> 'String' (In Ngrx State)
  dateValueConverter: NgrxValueConverter<DateTime | null, string | null> = {
    convertViewToStateValue(dateInView:DateTime) {
      return dateInView === null ? null : dateInView.toISODate();
    },
    convertStateToViewValue(dateInState:string) {
      return DateTime.fromISO(dateInState);
    }
  };
}