import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class BankAccountService {
  URL_BACK = environment.URL_BACKEND + '/BankAccounts';

  constructor(
    private http: HttpClient,
  ) { }

  saveAccount(bankAccount) {
    return this.http.post(this.URL_BACK, bankAccount);
  }

  listAccounts() {
    return this.http.get(this.URL_BACK);
  }

  deleteAccount(account) {
    return this.http.delete(`${this.URL_BACK}/${account.id}`);
  }
}
