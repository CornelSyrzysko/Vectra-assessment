import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResponse } from '../models/product';
import { Category, CategoryResponse } from '../models/category';
import { LoaderService } from '../components/loader/loader.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  products : Product[] = [];
  categories: Category[] = [];

  constructor(
    private http: HttpClient,
    private loader: LoaderService
  ) { }

  getProducts(offset: number, filter: string, category?: number, ) {
    var url = '/assets/json_files/products.json';
    return this.http.get<ProductResponse>(url).pipe(map(res => {
      this.products = res.data;
      console.log(`length: ${this.products.length}`)
      var filteredProducts = res.data;
      console.log(`before any change: ${filteredProducts}`)
      if (category) {
        filteredProducts = filteredProducts.filter(
          product => product.category.categoryId == category
        )
        console.log(`after category : ${filteredProducts}`)
      }
      if (filter != "") {
        filteredProducts = filteredProducts.filter(
          product => product.name.includes(filter) ||
            product.price.toString().includes(filter) ||
            product.category.categoryName.includes(filter)
        );
        console.log(`after filter: ${filteredProducts}`)
      }
      console.log(`filtered: ${filteredProducts}`);
      return filteredProducts.slice(0, offset*8);
    }));
    // await this.http.get<ProductResponse>(url).subscribe({
    //   next: (res) => {
    //     this.products = res.data;
    //     console.log(`products inside sub: ${this.products}`)
    //     this.loader.hideLoader();
    //   },
    //   error: (error) => {
    //     this.loader.hideLoader();
    //     throw `${error}`;
    //   }
    // });
    // console.log(`products: ${this.products}`)
    // return this.products;
  }

  getProductCategories()  {
    var url = '/assets/json_files/categories.json';
    return this.http.get<CategoryResponse>(url);
  }
}
