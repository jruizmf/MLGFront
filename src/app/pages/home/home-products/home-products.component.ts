import { Component, Input, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { IArticulo } from 'src/app/core/models';
import { ArticulosService } from 'src/app/core/services/articulos.service';
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  @Input() Articulos: IArticulo[] = [];
  imageUrl : string = environment.filesPath;
  expandPrices:boolean = false;
  constructor(private _articuloService: ArticulosService) { 
   this.getAll();
  }

  ngOnInit(): void { 

  }

  async  getAll(){
    await this._articuloService.getAll({}).then((x: any[]) => {
      console.log(x)
      this.Articulos = x;
    })
  }

}
