//#region Angular & Material
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
//#endregion

//#region App Component, Model
import { Account } from '@app_model/account.model';
import { AccountService } from '@app_service_feat/account.service';
//#endregion

// Api Info
import { envBusinessAPI } from '@env/environment';
const baseUrl = `${envBusinessAPI.apiUrl}/account`;

// TODO - Actuellement non utilisée dans l'App, A suppr ?
@Injectable({ providedIn: 'root' })
export class AccountAdminService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService) { }

  /************************************************
   * Administration Methods
   ************************************************/

  getAll() {
    return this.http.get<Account[]>(baseUrl);
  }

  getById(id: string) {
      return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  create(body: any) {
    return this.http.post(baseUrl, body);
  }

  update(id: string, body: any) {
      return this.http.put(`${baseUrl}/${id}`, body)
          .pipe(map((account: any) => {
              // Update logged in account if it was updated
              if (account.id === this.accountService.accountValue.id) {
                  this.accountService.updateAccount(account);
              }
              return account;
          }));
  }

  delete(id: string) {
      return this.http.delete(`${baseUrl}/${id}`)
          .pipe(finalize(() => {
              // Logout logged in account if it was deleted
              if (id === this.accountService.accountValue.id)
              this.accountService.logout();
          }));
  }
}