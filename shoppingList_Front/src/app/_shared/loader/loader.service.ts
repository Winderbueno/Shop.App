//#region Angular, Material, RxJS
import { Injectable } from '@angular/core';
//#endregion


@Injectable({ providedIn: 'root' })
export class LoaderService {

  private _loading: boolean = false;
  // TODO : add more info about what part is loading ?
  private _requestURL!: string;

  constructor() {}

  public get loading(): boolean { return this._loading; }

  /** Start loading */
  startLoading(requestURL: string) {
    this._loading = true;
    this._requestURL = requestURL;
  }

  /** Stop loading */
  stopLoading() {
    this._loading = false;
    this._requestURL = '';
  }
}
