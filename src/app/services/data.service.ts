import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResponse } from '../models/product';
import { Category, CategoryResponse } from '../models/category';
import { LoaderService } from '../components/loader/loader.service';
import { map } from 'rxjs';
import { SortOption } from '../models/sortOption.enum';

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

  getProducts(offset: number, filter: string, categories?: number[], sortOption?: SortOption ) {
    console.log('soption: ', sortOption)
    var url = '/assets/json_files/products.json';
    return this.http.get<ProductResponse>(url).pipe(map(res => {
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

      if (sortOption!=undefined) {
        console.log(sortOption);
        switch (+sortOption) {
          case SortOption.nameAZ:
            console.log('name az')
            filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
            break;
          case SortOption.catAZ:
            console.log('cat az')
            filteredProducts.sort((a,b) => a.category?.categoryName.localeCompare( b.category?.categoryName));
            break;
          case SortOption.priceASC:
            console.log('price acs')
            filteredProducts.sort((a,b) => a.price.toString().localeCompare(b.price.toString(), undefined, {numeric: true}));
            break;
          case SortOption.priceDESC:
            console.log('price desc');
            filteredProducts.sort((a,b) => b.price.toString().localeCompare(a.price.toString(), undefined, {numeric: true}));
            break;
        }
      }
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
