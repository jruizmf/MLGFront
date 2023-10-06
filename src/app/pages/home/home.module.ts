import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { NgParticlesModule } from 'ng-particles';
import { CartComponent } from '../cart/cart.component';
import { HomeProductsComponent } from './home-products/home-products.component';

@NgModule({
  declarations: [HomeComponent, CartComponent, HomeProductsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgParticlesModule],
  exports:[HomeProductsComponent]
})
export class HomeModule {
}
