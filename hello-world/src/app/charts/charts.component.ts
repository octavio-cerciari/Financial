import {Component, OnInit} from '@angular/core';
import {BankAccount} from '../config/models/BankAccount';
import {ModalService} from '../services/modal.service';
import {BankCardService} from '../services/bank-card.service';
import {BankAccountService} from '../services/bank-account.service';
import {PaymentFormService} from '../services/payment-form.service';
import {BankCards} from '../config/models/BankCards';
import {PaymentForm} from '../config/models/PaymentForm';
import {ChartsService} from '../services/charts.service';
import {PlacementService} from '../services/placement.service';
import {Placements} from '../config/models/Placements';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {
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
    private chartService: ChartsService
  ) {
  }

  ngOnInit() {
    this.loadLists();
    this.chartService.chartComponent = this;
  }

  loadLists() {
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

  async listPlaces() {
    this.places = await this.placeFormService.listPlaces().toPromise() as PaymentForm[];
  }

  async listCards() {
    this.cards = await this.bankCardService.listCards().toPromise() as BankCards[];
  }
}
