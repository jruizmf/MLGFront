import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './shared/guards/auth.guard';
import { RoleGuardService } from './shared/guards/role.guard';
import { httpInterceptorProviders } from './core/interceptors/http.interceptor';
import { HttpResponseInterceptor } from './core/interceptors/http-response.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpClientModule,
    AuthGuardService, 
    RoleGuardService,
    httpInterceptorProviders,
    {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
