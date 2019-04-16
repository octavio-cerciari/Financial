import { Injectable } from '@angular/core';
import {ChartsComponent} from '../charts/charts.component';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private _chartComponent: ChartsComponent;

  get chartComponent(): ChartsComponent {
    return this._chartComponent;
  }

  set chartComponent(value: ChartsComponent) {
    this._chartComponent = value;
  }

  constructor(
  ) { }

  reloadCharts = () => {
    this.chartComponent.loadLists();
  }
}
