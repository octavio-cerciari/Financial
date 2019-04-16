import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {Payable} from './Payable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentForm} from '../config/models/PaymentForm';
import {PaymentFormService} from '../services/payment-form.service';
import {ChartsService} from '../services/charts.service';
import {PayableService} from '../services/payable.service';
import {Placements} from '../config/models/Placements';
import {PlacementService} from '../services/placement.service';
import {ReleasesService} from '../services/releases.service';
import {GraphService} from '../services/graph.service';
import {Moment} from 'moment';
import * as moment from 'moment';




@Component({
  selector: 'app-payable',
  templateUrl: './payable.component.html',
  styleUrls: ['./payable.component.sass']
})
export class PayableComponent implements OnInit {

  payables: Payable[] = [];
  payableForm: FormGroup;
  payableFormVisible = false;
  payments: PaymentForm[];
  places: Placements[];
  _paymentFormDay = true;
  _paymentFormInstall = false;
  _paymentForm: PaymentForm;
  payablesInstallment: Payable[] = [];
  fullDate: Moment;



  get paymentFormDay() {
    return this._paymentFormDay;
  }

  get paymentFormInstall() {
    return this._paymentFormInstall;
  }

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private paymentFormService: PaymentFormService,
    private chartService: ChartsService,
    private releaseService: ReleasesService,
    private payableFormService: PayableService,
    private placementFormService: PlacementService,
    private graphFormService: GraphService,


  ) {
  }

  get showModalPayable() {
    return this.modalService.showModalPayable;
  }

  set showModalPayable(value) {
    this.modalService.showModalPayable = value;
  }

  showFormPayable(value?) {
    this.payableForm.reset();
    if (!value && value !== false) {
      this.payableFormVisible = !this.payableFormVisible;
    } else {
      this.payableFormVisible = value;
    }
  }

  async deletePayable(payable) {
    await this.payableFormService.deletePayable(payable).toPromise();
    await this.listPayable();
    this.reloadAll();
  }

  async savePayable() {
    let tInstall;
    let tTotalAmount;
    let tInstallAmount;
    let tType;
    let tPaymentFormId;
    let tPlacementId;
    let tName;

    if (this.payableForm.invalid) {
      return false;
    }
    this.payableFormVisible = !this.payableFormVisible;

    tInstall = this.payableForm.controls.installment.value;
    tTotalAmount = this.payableForm.controls.amount.value;
    tInstallAmount = tTotalAmount / tInstall;
    tType = this.payableForm.controls.type.value;
    tPaymentFormId = this.payableForm.controls.paymentFormId.value as PaymentForm;
    tPlacementId = this.payableForm.controls.placementId.value as Placements;

    if (this._paymentForm.bankCard.payday === true) {
      const auxdate = new Date();
      moment().format();
      this.fullDate = moment(this._paymentForm.bankCard.day + '-' + auxdate.getMonth() + '-' + auxdate.getFullYear(), 'DD-MM-YYYY');
    }



    if (tInstall === '1' ) {
      const payable: Payable = await this.payableFormService.savePayable(this.payableForm.value, this.fullDate.format('DD/MM/YYYY')).toPromise() as Payable;
      if (!payable) {
        console.log('Ocorreu um Erro ao Salvar Placement');
        return false;
      }

    } else if (tInstall > 1) {
      for ( let x = 1; x <= tInstall; x++) {
        tName = this.payableForm.controls.name.value + ' ' + x + '/' + tInstall;
        this.fullDate.add(1 , 'months').calendar();
        const payableObject: Payable = {
          name: tName,
          type: tType,
          paymentFormId: tPaymentFormId,
          placementId: tPlacementId,
          amount: tInstallAmount,
          date: this.fullDate.format('DD/MM/YYYY'),
          installment: tInstall,
          progress: 'Aberto',
        };
        this.payablesInstallment.push(payableObject);
      }
      for (const payable of this.payablesInstallment) {
        this.payableFormService.savePayable(payable, payable.date).toPromise();
        if (!payable) {
          console.log('Ocorreu um Erro ao Salvar Placement');
          return false;
        }
      }
    }

    await this.listPayments();
    await this.listPayable();
    this.reloadAll();
    return true;
  }

  async listPayments() {
    this.payments = await this.paymentFormService.listPaymentForms().toPromise() as PaymentForm[];
  }

  async listPayable() {
    this.payables = await this.payableFormService.listPayables().toPromise() as Payable[];
  }

  async listPlacements() {
    this.places = await this.placementFormService.listPlaces().toPromise() as Placements[];
  }


  ngOnInit() {
    this.createForm();
    this.loadForm();
  }

  loadForm() {
    this.listPayments().then();
    this.listPayable().then();
    this.listPlacements().then();
  }

  reloadAll() {
    this.chartService.reloadCharts();
    this.releaseService.reloadRelease();
    this.graphFormService.reloadGraph();
  }

  async loadPaymentForm() {
    this._paymentForm = await this.paymentFormService.getPaymentById(this.payableForm.controls.paymentFormId.value).toPromise() as PaymentForm;

    if (this._paymentForm.bankCard.day) {
      this._paymentFormDay = true;
    } else { this._paymentFormDay = false; }
    if (this._paymentForm.bankCard.installment !== true) {
      this._paymentFormInstall = false;
    } else { this._paymentFormInstall = true; }
  }


  createForm() {
    this.payableForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      paymentFormId: [null, [Validators.required]],
      type: [null, [Validators.required]],
      installment: [null, [Validators.required]],
      placementId: [null, [Validators.required]],
    });
  }


  receiveDate({fullDate}) {
    this.fullDate = fullDate;
  }

}
