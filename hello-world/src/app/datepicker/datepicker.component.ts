import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent implements OnInit {
  @Output() fullDateEmitter = new EventEmitter();

  day: number;
  year: number;
  mounth: number;
  labelMounth: string;
  daysMounth: string;
  yearB: boolean;
  showDatePicker = true;
  date = new Date();
  fulldate: Moment;


  constructor() { }

  ngOnInit() {
    this.loadDatePicker();
  }




  loadDatePicker() {
    this.day = this.date.getDate();
    this.year = this.date.getFullYear();
    this.mounth = this.date.getMonth() + 1;
    this.setYearB(1);
    this.setLabel(this.mounth);
    this.setDaysMounth(this.mounth);
    this.setFullDate();

  }


  nextMounth() {
    this.mounth = this.mounth + 1;
    if (this.mounth > 12) {
      this.mounth = 1;
      this.year = this.year + 1;
    }
    this.setLabel(this.mounth);
    this.setDaysMounth(this.mounth);
  }

  prevMounth() {
    this.mounth = this.mounth - 1;
    if (this.mounth < 1) {
      this.mounth = 12;
      this.year = this.year - 1;
    }
    this.setLabel(this.mounth);
    this.setDaysMounth(this.mounth);
  }

  setLabel(n) {
    if (n === 1) {
      this.labelMounth = 'Janeiro';
    } else if (n === 2) {
      this.labelMounth = 'Fevereiro';
    } else if (n === 3) {
      this.labelMounth = 'Março';
    } else if (n === 4) {
      this.labelMounth = 'Abril';
    } else if (n === 5) {
      this.labelMounth = 'Maio';
    } else if (n === 6) {
      this.labelMounth = 'Junho';
    } else if (n === 7) {
      this.labelMounth = 'Julho';
    } else if (n === 8) {
      this.labelMounth = 'Agosto';
    } else if (n === 9) {
      this.labelMounth = 'Setembro';
    } else if (n === 10) {
      this.labelMounth = 'Outubro';
    } else if (n === 11) {
      this.labelMounth = 'Novembro';
    } else if (n === 12) {
      this.labelMounth = 'Dezembro';
    }
    this.setFullDate();
  }

  setDay(d) {
    this.day = d;
    this.setFullDate();
  }

  setDaysMounth(m) {
    if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) {
      this.daysMounth  = 'true';
    } else if (m === 2 ) {
      this.daysMounth  = 'fev';
    } else {
      this.daysMounth  = 'false';
    }
  }

  setYearB(y) {
    // FAZER CALCULO DE ANO BISSEXTO E SETAR TRUE SE POSITIVO
    // FALSE SE NEGATIVO
    this.yearB = true;

  }

  setFullDate() {
      moment().format();
    console.log('SETANDO DATE');
    this.fulldate = moment(this.day + '-' + this.mounth + '-' + this.year, 'DD-MM-YYYY');
    this.fullDateEmitter.emit({fullDate : this.fulldate});
  }
}
