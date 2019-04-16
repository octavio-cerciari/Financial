import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PaymentFormService {
  URL_BACK = environment.URL_BACKEND + '/PaymentForms';
  constructor(
    private http: HttpClient,
  ) { }

  savePaymentForm(payment) {
    return this.http.post(this.URL_BACK, payment);
  }

  listPaymentForms() {
    return this.http.get(this.URL_BACK + '?filter={"include":["bankCard"]}');
  }

  deletePayment(payment) {
    return this.http.delete(`${this.URL_BACK}/${payment.id}`);
  }

  getPaymentById(id) {
    return this.http.get(this.URL_BACK + '/' + id + '?filter={"include":["bankCard"]}');
  }
}
