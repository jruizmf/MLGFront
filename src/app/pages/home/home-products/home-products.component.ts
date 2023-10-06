import { Component, Input, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { IArticulo } from 'src/app/core/models';
import { ArticulosService } from 'src/app/core/services/articulos.service';
@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  @Input() articulos: IArticulo[] = [];
  imageUrl : string = environment.filesPath;
  expandPrices:boolean = false;
  constructor(private _articuloService: ArticulosService) { 
   this.obtenerTodo();
  }

  ngOnInit(): void { 

  }

  async  obtenerTodo(){
    await this._articuloService.obtenerTodo({}).then((x: any[]) => {
      this.articulos = x;
    })
  }

}
