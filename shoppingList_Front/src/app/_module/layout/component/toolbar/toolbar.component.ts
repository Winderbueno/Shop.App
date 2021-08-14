//#region Angular & Material
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//#endregion

//#region NgRx
import { Store } from '@ngrx/store';
import * as AccountSelector from '@app_selector/account.selectors';
import * as AccountComponentActions from '@app_action/component/account.component.actions';
//#endregion

//#region App Component, Model
import { Account } from '@app_model/account.model';
//#endregion

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // Accessor // TODO - Use NgRxStore
  //get account() { return this.account$.pipe(take(1)); }
  account!: Account[];
  isLogged: boolean = false;

  constructor(
    private router: Router,
    private store: Store
  ) { // TODO - Change selector to "GetConnected"
    this.store.select(AccountSelector.isLogged).subscribe(value => this.isLogged=value);
    this.store.select(AccountSelector.getAccounts).subscribe(value => this.account=value);
  }

  ngOnInit(): void {}

  logout() {

    // Dispatch LogOut action
    this.store.dispatch(AccountComponentActions.toolbarLogOut());

    this.router.navigate(['/']);
  }

}
