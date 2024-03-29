//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//#endregion

//#region App Component, Model
import { Account } from '@account/model/account.model';
//#endregion

// Api Info
import { envBusinessAPI } from '@env/environment';
const baseUrl = `${envBusinessAPI.apiUrl}/auth`;


@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/sign-in`, { email, password }, { withCredentials: true });
  }

  logout() {
    return this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true });
  }

  register(account: Account) {
    return this.http.post(`${baseUrl}/sign-up`, account);
  }

  verifyEmail(token: string | undefined) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }

  resetPassword(token: string | undefined, password: string, passwordConfirm: string) {
    return this.http.post(`${baseUrl}/reset-password`, { token, password, passwordConfirm });
  }

  refreshToken() {
    return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true });
  }

  validateResetToken(token: string | undefined) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  }
}
