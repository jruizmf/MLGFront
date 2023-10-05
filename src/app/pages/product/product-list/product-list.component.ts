import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/core/services/articulos.service';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean |undefined;
  advanceSearchExpanded: boolean = false;
  products: any = [];
  expandPrices:boolean = false;
  constructor(private _articuloService : ArticulosService) {
    this.getAll();
  }


  async  getAll(){
    await this._articuloService.getAll({}).then((x: any[]) => {
      console.log(x)
      this.products = x;
    })
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true
    }, 8000)
  }
}
