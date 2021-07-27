//#region Angular, Material, RxJS
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
//#endregion

//#region App Component, Model, Service
import { AccountService } from '@app_account/service/account.service';
//#endregion

// Api Info
import { envBusinessAPI } from '@env/environment';


@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add auth header with jwt if user is logged in and request is to the api url
        const account = this.accountService.accountValue;
        const isLoggedIn = account && account.jwtToken;
        const isApiUrl = request.url.startsWith(envBusinessAPI.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${account.jwtToken}`
                }
            });
        }

        return next.handle(request);
    }
}
