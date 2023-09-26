import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './views/landing/landing.component';
import { ProductsComponent } from './views/products/products.component';

const routes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: 'full' },
  { path: "landing", component: LandingComponent },
  { path: "products", component: ProductsComponent },
  { path: '**', redirectTo: "/landing", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
