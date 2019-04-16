import { Injectable } from '@angular/core';
import {DatepickerComponent} from '../datepicker/datepicker.component';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  private _datePickerComponent: DatepickerComponent;

  get datepickerComponent(): DatepickerComponent {
    return this._datePickerComponent;
  }


  constructor() {
  }


}
