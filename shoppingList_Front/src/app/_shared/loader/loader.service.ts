//#region Angular, Material, RxJS
import { Injectable } from '@angular/core';
//#endregion

//#region Model and Service
//#endregion

// Api Info
import { envBusinessAPI } from '@env/environment';
const baseUrl = `${envBusinessAPI.apiUrl}/enum`;

@Injectable({ providedIn: 'root' })
export class LoaderService {

  private _loading: boolean = false;
  private requestURL!: string;

  constructor() {}

  public get loading(): boolean { return this._loading; }

  /** Start loading */
  startLoading(requestURL: string) {
    this._loading = true;
    this.requestURL = requestURL;
  }

  /** Stop loading */
  stopLoading() {
    this._loading = false;
    this.requestURL = '';
  }
}