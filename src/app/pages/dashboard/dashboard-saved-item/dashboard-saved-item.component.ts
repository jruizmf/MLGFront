import { Component, OnInit } from '@angular/core';
import { IArticuloCliente } from 'src/app/core/models';
import { ClienteArticuloService } from 'src/app/core/services/clienteArticulos.service';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';

  orders: IArticuloCliente[]  = [];
  constructor(private _ClienteArticulo: ClienteArticuloService) {}
  ngOnInit(): void {
    this.obtenerTodo()
  }

  async  obtenerTodo(){
    await this._ClienteArticulo.getUser({}).then((x: IArticuloCliente[]) => {
      console.log(x)
      this.orders = x;
    })
  }
}
