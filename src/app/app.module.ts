import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProductsComponent,
    ProductComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    RouterModule
  ],
  providers: [OverlayModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
