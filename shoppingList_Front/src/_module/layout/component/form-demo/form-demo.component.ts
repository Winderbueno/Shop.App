//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
//#endregion

//#region Module
import { FormComponent } from '@module/ngrx-form/component/form.component';
import { Enum } from '@enum/model/enum.model';
import * as fromEnum from '@enum/store/';
import * as fromAlert from '@alert/store/';
//#endregion


@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html'
})
export class FormDemoComponent extends FormComponent {  

  // Proposition values
  productCatEnum$!: Observable<Enum|undefined>;

  ngOnInit(){
    this.productCatEnum$ = this.store.select(fromEnum.selectEnumByName('ProductCategory'));
    
    // Form Configuration
    super.title = "Form Demo";
    super.submitValidAction = fromAlert.triggerAlertAction({
      alertType: fromAlert.AlertTypeEnum.Success,
      message: "Valid Form Submitted !",
      keepAfterRouteChange: false
    });
    super.submitInvalidAction = fromAlert.triggerAlertAction({
      alertType: fromAlert.AlertTypeEnum.Error,
      message: "Invalid Form Submitted !",
      keepAfterRouteChange: false
    });
    super.ngOnInit();
  }
}