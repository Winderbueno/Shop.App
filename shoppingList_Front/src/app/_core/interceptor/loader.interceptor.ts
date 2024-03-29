//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
//#endregion

//#region Module
import * as fromLoader from '@loader/store';
//#endregion


@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  /** TODO - Comment  Handle Http  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // Start loader
      this.store.dispatch(
        fromLoader.startLoaderAction({
          triggerSource: request.url.toString()
        })
      );

      return next.handle(request);
  }
}
