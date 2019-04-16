import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _showModalPayable;
  private _showModalConfig;
  constructor() { }


  get showModalPayable() {
    return this._showModalPayable;
  }

  set showModalPayable(value) {
    this._showModalPayable = value;
  }

  get showModalConfig() {
    return this._showModalConfig;
  }

  set showModalConfig(value) {
    this._showModalConfig = value;
  }
}
