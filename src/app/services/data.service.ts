import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResponse } from '../models/product';
import { Category, CategoryResponse } from '../models/category';
import { map } from 'rxjs';
import { SortOption } from '../models/sortOption.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  products : Product[] = [];
  categories: Category[] = [];

  // I found it very difficult to emulate with local data, but it's usually best to keep data
  // in a service rather than the component to help with state management.

  constructor(
    private http: HttpClient
  ) { }

  getProducts(offset: number, filter: string, categories?: number[], sortOption?: SortOption ) {
    // trying to simulate an actual api call
    // fetching local json data
    var url = '/assets/json_files/products.json';
    return this.http.get<ProductResponse>(url).pipe(map(res => { // pipe the data to alter it before sending to component
      this.products = res.data;
      var filteredProducts = res.data;
      if (categories) {
        filteredProducts = filteredProducts.filter(
          product => categories.includes (product.category.categoryId)
        )
      }
      if (filter != "") {
        filteredProducts = filteredProducts.filter(
          product => product.name.toLowerCase().includes(filter) ||
            product.price.toString().includes(filter) ||
            product.category.categoryName.toLowerCase().includes(filter)
        );
      }

      if (sortOption!=undefined) { // using enums make dealing with string options safer and easier
        switch (+sortOption) {
          case SortOption.nameAZ:
            filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
            break;
          case SortOption.catAZ:
            filteredProducts.sort((a,b) => a.category?.categoryName.localeCompare( b.category?.categoryName));
            break;
          case SortOption.priceASC:
            filteredProducts.sort((a,b) => a.price.toString().localeCompare(b.price.toString(), undefined, {numeric: true}));
            break;
          case SortOption.priceDESC:
            filteredProducts.sort((a,b) => b.price.toString().localeCompare(a.price.toString(), undefined, {numeric: true}));
            break;
        }
      }

      // normally pagination would be handled by the backend and just requested with an offset from the frontend
      // for optimisation the frontend to store/cache the data already retrieved to if user "pages", some of the old
      // data can just be fetched locally instead of through an API call
      return filteredProducts.slice(0, offset*8);
    }));
  }

  getProductCategories()  {
    var url = '/assets/json_files/categories.json';
    return this.http.get<CategoryResponse>(url);
  }
}
