import { Injectable } from '@angular/core';
import {ReleaseComponent} from '../charts/release/release.component';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  private _releaseComponent: ReleaseComponent;

  get releaseComponent(): ReleaseComponent {
    return this._releaseComponent;
  }

  set releaseComponent(value: ReleaseComponent) {
    this._releaseComponent = value;
  }
  constructor() { }

  reloadRelease() {
    this.releaseComponent.loadList();
  }
}
