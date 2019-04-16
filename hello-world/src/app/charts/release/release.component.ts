import { Component, OnInit } from '@angular/core';
import {PayableService} from '../../services/payable.service';
import {Payable} from '../../payable/Payable';
import {ReleasesService} from '../../services/releases.service';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.sass']
})
export class ReleaseComponent implements OnInit {
  payablesOpen: Payable[] = [];
  payablesLate: Payable[] = [];
  payables: Payable[] = [];
  payablesClose: Payable[] = [];

  constructor(
    private payableFormService: PayableService,
    private releaseService: ReleasesService,
  ) { }

  ngOnInit() {
    this.loadList();
    this.releaseService.releaseComponent = this;
  }

  loadList() {
    this.listPayable();
  }

  async listPayable() {
    this.payables = [];
    this.payablesOpen = [];
    this.payablesClose = [];
    this.payablesLate = [];
    this.payables = await this.payableFormService.listPayables().toPromise() as Payable[];

    for (let x = 0; x < this.payables.length; x++) {
      if (this.payables[x].progress === 'Aberto') {
        this.payablesOpen.push(this.payables[x]);
      } else if(this.payables[x].progress === 'Fechado') {
        this.payablesClose.push(this.payables[x]);
      } else {
        this.payablesLate.push(this.payables[x]);
      }
    }
  }

  async changeProgress(payable, progress) {
    payable.progress = progress.toString();
    await this.payableFormService.putPayable(payable).toPromise().then( (res) => {
      this.listPayable();
    }).catch( (err) => {
      console.log("Erro ao trocar Lançamento de Fila" + err);
    });
  }

}
