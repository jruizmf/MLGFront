import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/core/services/articulos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean |undefined;
  advanceSearchExpanded: boolean = false;
  articulos: any = [];
  imageUrl = environment.filesPath;
  constructor(private _articuloService : ArticulosService) {
    this.getAll();
  }


  async  getAll(){
    await this._articuloService.getAll({}).then((x: any[]) => {
      this.articulos = x;
    })
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true
    }, 8000)
  }
}
