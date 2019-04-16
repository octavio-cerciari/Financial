import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ModalService} from '../services/modal.service';

import {BankAccount} from './models/BankAccount';
import {BankAccountService} from '../services/bank-account.service';

import {BankCards} from './models/BankCards';
import {BankCardService} from '../services/bank-card.service';

import {PaymentForm} from './models/PaymentForm';
import {PaymentFormService} from '../services/payment-form.service';

import {Placements} from './models/Placements';
import {PlacementService} from '../services/placement.service';
import {ChartsService} from '../services/charts.service';




@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.sass']
})
export class ConfigComponent implements OnInit {
  @Input() accounts: BankAccount[] = [];

  cards: BankCards[] = [];
  payments: PaymentForm[] = [];
  places: Placements[] = [];

  accountForm: FormGroup;
  cardsForm: FormGroup;
  payementForm: FormGroup;
  placesForm: FormGroup;

  accountFormVisible = false;
  cardsFormVisible = false;
  payementFormVisible = false;
  placesFormVisible = false;
  _dayTrue = '0';

  get dayTrue() {
    return parseInt(this._dayTrue, 10);
  }


  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private bankAccountService: BankAccountService,
    private placementService: PlacementService,
    private paymentFormService: PaymentFormService,
    private bankCardService: BankCardService,
    private chartService: ChartsService,
  ) {

  }


  // DELETE
  async deletePlaces(place) {
    await this.placementService.deletePlace(place).toPromise();
    await this.listPlacements();
    this.chartService.reloadCharts();
  }

  async deleteAccounts(account) {
    await this.bankAccountService.deleteAccount(account).toPromise();
    await this.listAccounts();
    this.chartService.reloadCharts();
  }

  async deletePayments(payment) {
    await this.paymentFormService.deletePayment(payment).toPromise();
    await this.listPayments();
    this.chartService.reloadCharts();
  }

  async deleteCards(card) {
    await this.bankCardService.deleteCard(card).toPromise();
    await this.listCards();
    this.chartService.reloadCharts();
  }

  // SHOW MODAL
  get showModalConfig() {
    return this.modalService.showModalConfig;
  }

  set showModalConfig(value) {
    this.modalService.showModalConfig = value;
  }

  showFormAccount(value?) {
    this.accountForm.reset();
    if (!value && value !== false) {
      this.accountFormVisible = !this.accountFormVisible;
    } else {
      this.accountFormVisible = value;
    }
  }

  showFormCard(value?) {
    this.cardsForm.reset();
    if (!value && value !== false) {
      this.cardsFormVisible = !this.cardsFormVisible;
    } else {
      this.cardsFormVisible = value;
    }
  }

  showFormPayement(value?) {
    this.payementForm.reset();
    if (!value && value !== false) {
      this.payementFormVisible = !this.payementFormVisible;
    } else {
      this.payementFormVisible = value;
    }
  }

  showFormPlace(value?) {
    this.placesForm.reset();
    if (!value && value !== false) {
      this.placesFormVisible = !this.placesFormVisible;
    } else {
      this.placesFormVisible = value;
    }
  }

  // SAVE
  async saveAccount() {
    if (this.accountForm.invalid) {
      return false;
    }
    this.accountFormVisible = !this.accountFormVisible;
    const account: BankAccount = await this.bankAccountService.saveAccount(this.accountForm.value).toPromise() as BankAccount;
    if (!account) {
      console.log('Ocorreu um Erro ao Salvar Bank Account');
      console.log(account);
      return false;
    }
    await this.listAccounts();
    this.chartService.reloadCharts();
    return true;
  }

  async saveCard() {
    if (this.cardsForm.invalid) {
      return false;
    }
    this.cardsFormVisible = !this.cardsFormVisible;
    const card: BankCards = await this.bankCardService.saveCard(this.cardsForm.value).toPromise() as BankCards;
    if (!card) {
      console.log('Ocorreu um Erro ao Salvar Bank Card');
      return false;
    }
    await this.listCards();
    this.chartService.reloadCharts();
    return true;

  }

  async savePayement() {
    if (this.payementForm.invalid) {
      return false;
    }
    this.payementFormVisible = !this.payementFormVisible;
    const payment: PaymentForm = await this.paymentFormService.savePaymentForm(this.payementForm.value).toPromise() as PaymentForm;
    if (!payment) {
      console.log('Ocorreu um Erro ao Salvar Payment');
      return false;
    }
    await this.listPayments();
    this.chartService.reloadCharts();
    return true;

  }

  async savePlace() {
    if (this.placesForm.invalid) {
      return false;
    }
    this.placesFormVisible = !this.placesFormVisible;
    const place: Placements = await this.placementService.savePlace(this.placesForm.value).toPromise() as Placements;
    if (!place) {
      console.log('Ocorreu um Erro ao Salvar Placement');
      return false;
    }
    await this.listPlacements();
    this.chartService.reloadCharts();
    return true;
  }

  // LIST
  async listAccounts() {
    this.accounts = await this.bankAccountService.listAccounts().toPromise() as BankAccount[];
  }

  async listPlacements() {
    this.places = await this.placementService.listPlaces().toPromise() as Placements[];
  }

  async listPayments() {
    this.payments = await this.paymentFormService.listPaymentForms().toPromise() as PaymentForm[];
  }

  async listCards() {
    this.cards = await this.bankCardService.listCards().toPromise() as BankCards[];
  }

  // END NG INIT
  ngOnInit() {
    this.showModalConfig = this.modalService.showModalConfig;
    this.createForm();
    this.Load();
  }

  Load() {
    console.log('Listar modelos');
    this.listPlacements();
    this.listAccounts();
    this.listCards();
    this.listPayments();
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      agency: [null, [Validators.required]],
      account: [null, [Validators.required]],
      amount: [0, [Validators.required]],
      color: [null, [Validators.required]]
    });

    this.cardsForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      flag: [null, [Validators.required]],
      bankAccountId: [null, [Validators.required]],
      payday: [null, [Validators.required]],
      day: [null],
      installment: [null, [Validators.required]]
    });

    this.payementForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      bankCardId: [null, [Validators.required]],
    });

    this.placesForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

}
