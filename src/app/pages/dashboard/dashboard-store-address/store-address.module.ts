import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreAddressComponent } from './store-address.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreAddressRoutingModule } from './store-address-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { StoreAddressFormComponent } from './store-address-form/store-address-form.component';
import { StoreAddProductComponent } from './components/store-add-product/store-add-product.component';
import { StoreProductListComponent } from './store-product-list/store-product-list.component';

@NgModule({
  declarations: [
    StoreAddressComponent,
    StoreAddressFormComponent,
    StoreAddProductComponent,
    StoreProductListComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forChild({ /* options */ }),
    StoreAddressRoutingModule,
    SharedModule, MatMenuModule
  ]
})
export class StoreAddressModule { }
