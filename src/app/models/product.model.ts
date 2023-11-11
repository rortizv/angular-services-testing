import { Category } from "./category.model";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: Array<string>;
  taxes?: number;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
