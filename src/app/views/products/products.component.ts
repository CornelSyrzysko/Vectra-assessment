import { Component } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { SortOption } from 'src/app/models/sortOption.enum';
import { DataService } from 'src/app/services/data.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  resizeObservable?: Observable<Event>;

  mobileView : boolean = false;
  products: Product[] = [];

  categories: Category[] = [];
  expandCategories: boolean = true;
  selectedCategories : number[] = []

  offset : number = 1;
  total : number = 0;

  search : string = "";
  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  sortOptions: SortObjedt[]= [
    {
      value: SortOption.nameAZ,
      name: "Name A-Z"
    },
    {
      value: SortOption.catAZ,
      name: "Category A-Z"
    },
    {
      value: SortOption.priceASC,
      name: "Price: Low - High"
    },
    {
      value: SortOption.priceDESC,
      name: "Price: High-Low"
    }
  ]
  sortSelected?:SortObjedt;
  expandSort: boolean = false;
  showMorePossible: boolean = true;

  subscriptions: Subscription[] =[];

  constructor(
    private dataService: DataService,
    private loader: LoaderService,
    private local : LocalService
  ) {
    this.mobileView = window.screen.width < 768 ;
  }

  ngOnInit(){


    this.resizeObservable = fromEvent(window, 'resize');
    this.subscriptions.push(this.resizeObservable.subscribe(event => {
      this.mobileView = window.screen.width < 768 ;
    }));

    this.subscriptions.push(
      this.trigger.subscribe(currentValue => {
        this.searchProducts(currentValue);
      })
    );

    this.loader.showLoader();
    this.recollectData();

    this.getCategories();
    this.getProducts();
  }

  recollectData() {
    this.search = this.local.getData('searchTerm');

    var stringValue = this.local.getData('sortBy');
    if (stringValue != "") {
      this.sortSelected = this.sortOptions[parseInt(stringValue)];
    } else {
      this.sortSelected = this.sortOptions[0];
    }

    stringValue = this.local.getData('offset');
    if (stringValue !="") {
      this.offset = parseInt(stringValue);
    } else {
      this.offset = 1;
    }

    stringValue = this.local.getData('categoryIds');
    if (stringValue!="") {
      this.selectedCategories = stringValue.split(',').map(Number);
    }

  }

  getCategories() {
    this.subscriptions.push(
      this.dataService.getProductCategories().subscribe({
        next: (res) => {
          this.categories = res.data;
          this.loader.hideLoader();
        },
        error: (error) => {
          this.loader.hideLoader();
        }
      })
    );

  }

  getProducts() {
    this.loader.showLoader();
    this.subscriptions.push(
      this.dataService.getProducts(this.offset, this.search.toLowerCase(),
      this.selectedCategories.length>0?this.selectedCategories :undefined,
      this.sortSelected?.value ).subscribe({
        next: (res) => {
          this.products = res;
          this.total = this.dataService.products.length;
          this.categories.forEach((cat, index) => {
            this.categories[index].numberOfProducts = this.dataService.products.filter((product)=> {
              return product.category.categoryId == cat.categoryId;
            }).length;
          });
          this.showMorePossible = (this.offset*8)<this.total;
          this.loader.hideLoader();
        },
        error: (error) => {
          console.error(error.toString());
          this.loader.hideLoader();
        }
      })
    );
  }

  searchProducts(searchValue: string) {
    this.local.saveData('searchTerm', searchValue);
    this.search = searchValue;
    this.getProducts();
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }

  selectCategory(categoryId: number) {

    var index = this.selectedCategories.indexOf(categoryId);
    if (index > -1) {
      this.selectedCategories.splice(index,1);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.local.saveData('categoryIds', this.selectedCategories.toString());
    this.getProducts();
  }

  sortProducts(option:SortObjedt ) {
    this.local.saveData('sortBy', option.value.toString());
    this.loader.showLoader();
    this.sortSelected = option;
    this.expandSort = false;
    this.getProducts();
  }

  showMore() {
    this.offset++;
    this.local.saveData('offset', this.offset.toString());
    this.getProducts();
  }

  // unsubscribe all subscriptions to prevent memory leaks
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

interface SortObjedt{
  name: string;
  value: SortOption;
}
