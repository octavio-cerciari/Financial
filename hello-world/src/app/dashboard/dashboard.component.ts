import { Component, OnInit } from '@angular/core';

import {ModalService} from '../services/modal.service';
import {BankCardService} from '../services/bank-card.service';
import {BankAccountService} from '../services/bank-account.service';
import {PaymentFormService} from '../services/payment-form.service';
import {PlacementService} from '../services/placement.service';

import {BankCards} from '../config/models/BankCards';
import {BankAccount} from '../config/models/BankAccount';
import {PaymentForm} from '../config/models/PaymentForm';
import {Placements} from '../config/models/Placements';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  accounts: BankAccount[] = [];
  cards: BankCards[] = [];
  payments: PaymentForm[] = [];
  places: Placements[] = [];

  constructor(
    private modalService: ModalService,
    private bankCardService: BankCardService,
    private bankAccountService: BankAccountService,
    private paymentFormService: PaymentFormService,
    private placeFormService: PlacementService,
    ) {

  }

  ngOnInit() {
    this.listAccounts();
    this.listCards();
    this.listPayments();
    this.listPlaces();

  }

  async listAccounts() {
    this.accounts = await this.bankAccountService.listAccounts().toPromise() as BankAccount[];
  }

  async listPayments() {
    this.payments = await this.paymentFormService.listPaymentForms().toPromise() as PaymentForm[];
  }

  async listCards() {
    this.cards = await this.bankCardService.listCards().toPromise() as BankCards[];
  }

  async listPlaces() {
    this.places = await this.placeFormService.listPlaces().toPromise() as Placements[];
  }


  openModalConfig() {

    this.modalService.showModalConfig = true;

  }
  openModalPayable() {
    this.modalService.showModalPayable = true;
  }


}
