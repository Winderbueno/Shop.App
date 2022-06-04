//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
//#endregion


@Injectable({ providedIn: 'root' })
export class FormatService {

  constructor(private currencyPipe: CurrencyPipe) { }

  // Convert value
  ToDecimal(value: string|boolean|number): number {

    return this.currencyPipe.
      transform(value as string, 'USD')?.
      replace("$", "") as unknown as number;
  }
}