import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreAddressComponent } from './store-address.component';
import { StoreAddressFormComponent } from './store-address-form/store-address-form.component';
import { StoreProductListComponent } from './store-product-list/store-product-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StoreAddressComponent
  },
  {
    path: 'guardar',
    component: StoreAddressFormComponent
  },
  {
    path: 'editar/:term',
    component: StoreAddressFormComponent
  },
  {
    path: 'articulos/:term',
    component: StoreProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreAddressRoutingModule { }
