import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription, Unsubscribable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { menuList as staticMenuList } from '../../data/menus';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticulosService } from 'src/app/core/services/articulos.service';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean = false;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean = false;
  isLoggeded: boolean = false;
  menuList: any[] = [];
  displayList:boolean = false;
  isLessThenLargeDevice: any ;
  cartCount:any = 0;
  subscription: Subscription;
  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService, public _articuloService: ArticulosService,  private _cartService: CartService, private router: Router) {
      this.subscription = this._cartService.getNumber().subscribe((x:any) => {
  
        this.cartCount = x;
      })
  }

  ngOnInit(): void {
    this.menuList = [];
    this.isLoggeded = this.auth.isAuthenticated()
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll():void {
    this.isScrolled = window.pageYOffset > 15;
  }

  goToCart():void{
    if (this.cartCount == 0) {
      Swal.fire("Redireccionando!", "No hay articulos en el carrito, Redireccionando...", "warning")
      this.router.navigate(['articulos']);
    } else {
      this.router.navigate(['cart']);
    }
    
  }
  logout():void{
    this.auth.logout();
  }
}
