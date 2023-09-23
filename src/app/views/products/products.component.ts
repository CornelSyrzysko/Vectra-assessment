import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: Product[] = [];
  categories: Category[] = [];

  offset : number = 1;
  search : string = "";
  total : number = 0;

  expandCategories = true;

  constructor(
    private dataService: DataService,
    private loader: LoaderService
  ) {}

  ngOnInit(){
    this.loader.showLoader();
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.dataService.getProductCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loader.hideLoader();
      },
      error: (error) => {
        this.loader.hideLoader();
      }
    });


  }

  getProducts() {
    this.dataService.getProducts(this.offset, this.search).subscribe({
      next: (res) => {
        this.products = res;
        this.total = this.dataService.products.length;
        this.loader.hideLoader();
      },
      error: (error) => {
        console.error(error.toString());
        this.loader.hideLoader();
      }
    });

    // .then((res) => {
    //   this.products = res;
    // })
    // .catch((err) => {
    //   // show error
    // });
  }



}
