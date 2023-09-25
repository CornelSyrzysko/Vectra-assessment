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

  @Input() selectedProduct?: number;
  @Input() product?: Product;
  @Input() viewCallback? : Function;

  ngOnInit() {
  }

}
