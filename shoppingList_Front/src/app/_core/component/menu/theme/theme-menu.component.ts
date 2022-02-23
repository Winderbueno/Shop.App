//#region Angular, Material, NgRx
import { Component } from '@angular/core';
//#endregion

//#region Module
import { FormComponent } from '@form/component';
import { MaterialThemeEnum } from '@material/model/theme.enum';
//#endregion


@Component({
  selector: 'menu-theme',
  templateUrl: './theme-menu.component.html'
})
export class ThemeMenuComponent extends FormComponent {

  // Proposition values
  materialThemeEnumKeys: string[] = Object.keys(MaterialThemeEnum);

  ngOnInit(){
    super.formId = "Theme-Menu";
    super.ngOnInit();
  }
}
