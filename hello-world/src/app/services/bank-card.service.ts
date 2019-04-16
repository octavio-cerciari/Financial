import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankCardService {
  URL_BACK = environment.URL_BACKEND + '/BankCards';
  constructor(
    private http: HttpClient,
  ) { }

  saveCard(card) {
    return this.http.post(this.URL_BACK, card);
  }

  listCards() {
    return this.http.get(this.URL_BACK + '?filter={"include":["bankAccount"]}');
  }

  deleteCard(card) {
    return this.http.delete(`${this.URL_BACK}/${card.id}`);
  }
}
