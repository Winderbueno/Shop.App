//#region Angular, Material, RxJS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app_shared/module/material.module';
//#endregion

//#region Declared Component
import { AlertComponent } from '@app/_shared/alert/component/alert.component';
import { SnackbarComponent } from '@app_alert/component/snackbar/snackbar.component';
import { PasswordFieldComponent } from './form/component/password-field/password-field.component';
import { EmailFieldComponent } from './form/component/email-field/email-field.component';
import { SelectTypeFieldComponent } from './form/component/select-type-field/select-type-field.component';
import { SubmitButtonComponent } from './form/component/submit-button/submit-button.component';
import { FormComponent } from './form/component/form.component';
//#endregion

@NgModule({
  imports: [
    // Angular, Material Module
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    // Alert
    AlertComponent,
    SnackbarComponent,

    // Form
    PasswordFieldComponent,
    EmailFieldComponent,
    SelectTypeFieldComponent,
    SubmitButtonComponent,
    FormComponent
  ],
  exports: [
    AlertComponent,
    PasswordFieldComponent,
    EmailFieldComponent,
    SelectTypeFieldComponent,
    SubmitButtonComponent
  ]
})
export class SharedModule { }
