import { Injectable } from '@angular/core';
import {GraphComponent} from '../charts/graph/graph.component';


@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private _graphComponent: GraphComponent;

  get graphComponent(): GraphComponent {
    return this._graphComponent;
  }

  set graphComponent(value: GraphComponent) {
    this._graphComponent = value;
  }

  constructor(
  ) { }

  reloadGraph = () => {
    this.graphComponent.listPayable();
  }
}
