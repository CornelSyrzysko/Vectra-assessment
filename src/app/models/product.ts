import { Category } from "./category"

export interface Product {
  productId: number
  name: string
  price: number
  salePrice: number
  category: Category
  image: string
}
