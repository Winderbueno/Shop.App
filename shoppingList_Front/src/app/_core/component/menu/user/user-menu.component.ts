//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
//#endregion

//#region Model, Action
import * as fromAccount from '@account/store';
import { Account } from '@account/model/account.model';
//#endregion


@Component({
  selector: 'menu-user',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {

  readonly isLogged$ = this.store.select(fromAccount.isLogged);
  account!: Account[];
  accountLogoutAction = fromAccount.logoutAction();

  constructor(private store: Store) {
    // TODO - Change selector to "GetConnectedAccount"
    this.store.select(fromAccount.selectAccounts)
      .subscribe(value => this.account=value);
  }
}
