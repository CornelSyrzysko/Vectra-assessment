import { Category } from "./category"

export interface ProductResponse {
  data: Product[]
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  oldPrice: number;
  category: Category;
  image: string;
}
