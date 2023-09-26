import { getLocaleCurrencyCode } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  // Custom components can make developing a lot easier when you can reuse a component over
  // and over. A lot of designs have the same general look across the board so singling out
  // where components are being repeated can simplify a UI.
  // Example: most buttons often look so much similar that it might be easier to create a component
  // and just use data binding and event binding to make it look and act the way you want. Same for
  // many other components


  @Input() product?: Product;
  @Input() viewCallback? : Function;

  ngOnInit() {
  }

}
