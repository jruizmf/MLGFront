import { Component, OnInit } from '@angular/core';
import { IArticuloCliente } from 'src/app/core/models';
import { ClienteArticuloService } from 'src/app/core/services/clienteArticulos.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {
  orders: IArticuloCliente[]  = [];
  constructor(private _clienteArticulo: ClienteArticuloService) {}
  ngOnInit(): void {
    this.getAll()
  }

  async  getAll(){
    await this._clienteArticulo.getAll({}).then((x: IArticuloCliente[]) => {
      this.orders = x;
    })
  }
}
