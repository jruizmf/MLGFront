import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ArticulosService } from 'src/app/core/services/articulos.service';
import { FileService } from 'src/app/core/services/file.service';
import { environment } from './../../../../environments/environment';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/core/services/cart.service';

export interface cart {
  productId: string,
  productName: string,
  slug: string,
  image: string,
  price: string ,
  quantity: number,
  total: number
}

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  isDisabled:boolean =true;
  cartItem: any;
  articulo: any;
  imageUrl : string = environment.filesPath;
  slug: any;
  size: any;
  salesForOrderPermits: any[] = [];
  salesForOrderPermit: any | undefined;
  selectedPrice:number;
  selectedImage: string = 'assets/images/No_image_available.png';

  constructor(private _articulosService: ArticulosService, private router: Router, private _cartService: CartService, private _fileService: FileService, private route : ActivatedRoute, private _authService: AuthService, private dialog: MatDialog) { 
    this.selectedPrice = 0
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.cartItem = {
      productId: "",
      productName: "",
      slug: this.slug,
      image: "",
      price: 0,
      quantity: 0,
      total: 0,
      optionComposes: []

    }
  }

  ngOnInit(): void {
    this.isDisabled = !this._authService.isAuthenticated();
    this.getProduct(this.slug);
  }
  selectImage(i: number){
    this.selectedImage = this.articulo.imagen
  }
  getProduct(slug:string) : void{
    this._articulosService.getOne(slug).then((res: any) => {
      this.articulo = res;
      if (typeof this.articulo != 'undefined') {
        if (typeof this.articulo.imagen != 'undefined') {
          this.selectedImage = this.articulo.imagen;
        }
      }

    })

  }
  
  selectSalesForOrderPermit(item: any){
    this.salesForOrderPermit = item;
    this.cartItem.quantity = item.unitSale;
  }
  uploadImages(): void {
    this.isDisabled =false;

  }

  selectQuantity(event:any){
    let selected = this.salesForOrderPermits.find(x=> x.unitSale == event);
   
    let role =  this._authService.getRole() as string

    let decrement = 0;
    if(role == "client"){
      decrement = selected.decrementClient;
    }else if(role == "frequent"){
      decrement = selected.decrementFrequent;
    }else if(role == "federal"){
      decrement = selected.decrementFederal;
    }else{
      decrement = selected.decrementFederal;
    }
    
   this.selectedPrice = this.selectedPrice - decrement;
    this.cartItem.quantity = event;
  }
  openDialog(): void {
    if (this.cartItem.quantity == 0) {
      Swal.fire('Cantidad no seleccionada..', 'Seleccione la cantidad de articulos que desea!', 'warning')
      return;
    }

    this.cartItem = {
      productId: this.articulo._id,
      productName: this.articulo.productName,
      slug: this.articulo.slug,
      image: this.articulo.imagen,
      price: this.articulo.precio,
      quantity: this.cartItem.quantity,
      total: this.selectedPrice
    }

  
  
        let cartString  = localStorage.getItem('cart')
        let cart: any = { items:[] }
     

        if(cartString != null){
          cart = JSON.parse(cartString)
          cart.items.push(this.cartItem)
          localStorage.setItem('cart', JSON.stringify(
            {items: cart.items}
          ));
            
          this._cartService.sendNumber(cart.items.length);
          this.router.navigate(['articulos']);
        } else{
          this._cartService.sendNumber(1);
          localStorage.setItem('cart', JSON.stringify(
            {items: [this.cartItem]}
          ));
      
          this.router.navigate(['articulos']);
        }
        
  }

}
