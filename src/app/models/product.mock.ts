import { faker } from '@faker-js/faker';
import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: faker.datatype.number(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    images: [
      faker.image.imageUrl(),
      faker.image.imageUrl(),
    ],
    category: {
      id: faker.datatype.number(),
      name: faker.commerce.department(),
    },
  }
}

export const generateProducts = (amount: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < amount; i++) {
    products.push(generateOneProduct());
  }
  return [...products];
}
