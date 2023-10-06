import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IArticuloCliente } from 'src/app/core/models/articuloCliente';
import { CartService } from 'src/app/core/services/cart.service';
import { ClienteArticuloService } from 'src/app/core/services/clienteArticulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  carritoCompras: any[] = [];
  ordenes: any[] = [];
  cantidadEnProducto: number[] = [];
  totalProducto: number[] = [];
  total: any = {
    precio:0,
    impuesto:0,
    total:0,
  }
  constructor(private router: Router, private _cartService: CartService, private _articuloService: ClienteArticuloService) {
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      let cart = JSON.parse(localStorage.getItem('cart') || '{}');

      cart.items.forEach((item: any, index:number) => {
        this.totalProducto[index] = item.total
        this.cantidadEnProducto[index] = 1;
        this.total.precio = this.total.precio + item.total
        this.total.impuesto = (this.total.price * .15);
        this.total.total = this.total.precio + this.total.impuesto
      });
      this.carritoCompras =   cart.items
    }
  }

  ngOnInit(): void {
   
  }
  calculateTotals(event: any, i:number){
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      this.cantidadEnProducto[i] = event
      this.totalProducto[i] = this.carritoCompras[i].total * this.cantidadEnProducto[i];
    cart.items.forEach((item: any, index:number) => {
      this.cantidadEnProducto[index] = 1;
      this.total.price = this.total.price + (item.total * this.cantidadEnProducto[index])
      this.total.tax = (this.total.price * .15);
      this.total.total = this.total.price + this.total.tax
    });
  }
  createOrder():void{
    Swal.fire({
      title: 'Está seguro de realizar su orden?',
      text: 'No podrá cancelar esta orden!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, realizar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let order: IArticuloCliente = {
          articuloId: "",
          clienteId: "",
          fecha: new Date
      }
        this._articuloService.save(order).subscribe((x:any) => {
          Swal.fire("Articulo", "El Articulo se agregó exitosamente...", "success")
            localStorage.removeItem('cart')
            this.carritoCompras = []
            this.router.navigate(['articulos']);
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Compra no realizada :)',
          'error'
        )
      }
    })
    
  }

  removeItem(i:number){
    let cartString  = localStorage.getItem('cart')
    if(cartString != null){
      this.carritoCompras.splice(i, 1);
      if(this.carritoCompras.length == 0){
        Swal.fire("Eliminando productos", "No hay producto en el carrito de compras, redireccionando a articulos...", "warning")
        localStorage.removeItem('cart')
        this.carritoCompras = []
        this.router.navigate(['articulos']);
      }
      this._cartService.sendNumber(this.carritoCompras.length);
      localStorage.setItem('cart', JSON.stringify(
        {items: this.carritoCompras}
      ));
    }
  }
}
