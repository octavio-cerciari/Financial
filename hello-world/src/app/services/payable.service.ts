import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayableService {

  URL_BACK = environment.URL_BACKEND + '/Payables';
  constructor(
    private http: HttpClient,
  ) { }

  savePayable(payable, date) {
    payable.date = date;
    return this.http.post(this.URL_BACK, payable);
  }

  listPayables() {
    return this.http.get(this.URL_BACK + '?filter={"include":["paymentForm", "bankAccount", "placement"]}');
  }

  deletePayable(payable) {
    return this.http.delete(`${this.URL_BACK}/${payable.id}`);
  }

  putPayable(payable) {
    return this.http.put(this.URL_BACK, payable);
  }
}
