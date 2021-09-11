﻿//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
//#endregion

//#region App Model, Action, Selector
import * as AccountSelector from '@account/store/account.selectors';
//#endregion


@Component({ templateUrl: 'card-layout.component.html' })
export class CardLayoutComponent {

  isLogged: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
  ) {

    this.store.select(AccountSelector.isLogged).subscribe(value => this.isLogged=value)
    // TODO - This is specific to account, not to the layout
    // Redirect to home if already logged in
    if (this.isLogged) { this.router.navigate(['/']); }
  }
}