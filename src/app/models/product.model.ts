import { Category } from "./category.model";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
