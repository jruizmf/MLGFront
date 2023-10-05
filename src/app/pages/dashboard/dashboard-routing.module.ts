import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { StoreAddressComponent } from './dashboard-store-address/store-address.component';



const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardProfileComponent
  },
  {
    path: 'articulos',
    loadChildren: () => import('./dashboard-product/dashboard-product.module').then(m => m.DashboardProductModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./dashboard-user/dashboard-user.module').then(m => m.DashboardUserModule)
  },
  {
    path: 'tiendas',
    component: StoreAddressComponent
  },
  {
    path: 'mis-articulos',
    loadChildren: () => import('./dashboard-saved-item/dashboard-saved-item.module').then(m => m.DashboardSavedItemModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./dashboard-profile/dashboard-profile.module').then(m => m.DashboardProfileModule)
  },
  {
    path: 'ordenes',
    loadChildren: () => import('./dashboard-order/dashboard-order.module').then(m => m.DashboardOrderModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
