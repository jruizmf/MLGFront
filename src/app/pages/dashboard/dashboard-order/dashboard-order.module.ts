import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardOrderRoutingModule } from './dashboard-order-routing.module';
import { DashboardOrderFormComponent } from './dashboard-order-form/dashboard-order-form.component';
import { ComposeOptionsViewerComponent } from './components/compose-options-viewer/compose-options-viewer.component';


@NgModule({
  declarations: [
    DashboardOrderFormComponent,
    ComposeOptionsViewerComponent
  ],
  imports: [
    CommonModule,
    DashboardOrderRoutingModule
  ]
})
export class DashboardOrderModule { }
