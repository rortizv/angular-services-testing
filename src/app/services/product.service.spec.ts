import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from './product.service';
import { Product } from 'src/app/models/product.model';
import { generateProducts, generateOneProduct } from '../models/product.mock';
import { environment } from 'src/environments/environment';
import { CreateProductDTO } from '../models/product.model';

describe('ProductService', () => {
  let productService: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ]
    });

    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });



  describe('getAllSimple', () => {
    it('should return an array of products', (doneFn) => {
      // Arrange
      // const dummyProducts: Product[] = [
      //   {
      //     id: 1,
      //     title: 'product 1',
      //     price: 100,
      //     description: 'description 1',
      //     category: {
      //       id: 1,
      //       name: 'category 1'
      //     },
      //     images: [
      //       'https://img.uswitch.com/n36b8lzdmgnp/6flMYPMjJ0sZzNs16Fsqa/c525a3f838b0e62716631f003390506b/shutterstock_1736005427212121212.jpg?auto=format%2Ccompress&q=35&ixlib=react-9.5.1-beta.1',
      //       'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/02/hipertextual-samsung-galaxy-a51-2020945736.jpg?resize=800%2C600&quality=50&strip=all&ssl=1'
      //     ]
      //   },
      //   {
      //     id: 2,
      //     title: 'product 2',
      //     price: 200,
      //     description: 'description 2',
      //     category: {
      //       id: 2,
      //       name: 'category 2'
      //     },
      //     images: [
      //       'https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2023---our-top-10-list.jpg',
      //       'https://www.todoparaelhogar.net/wp-content/uploads/2023/09/mejores-marcas-de-celulares-800x533.jpg'
      //     ]
      //   }
      // ];

      const dummyProducts = generateProducts(1);

      productService.getAllSimple()
        .subscribe(products => {
          // Assert
          expect(products.length).toEqual(dummyProducts.length);
          expect(products).toEqual(dummyProducts);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });
  });


  describe('getAll', () => {
    it('should return an array of products', (doneFn) => {
      // Arrange
      const dummyProducts = generateProducts(5);

      productService.getAll()
        .subscribe(products => {
          // Assert
          expect(products.length).toEqual(dummyProducts.length);
          //expect(products).toEqual(dummyProducts);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });

    it('should return an array of products with taxes', (doneFn) => {
      // Arrange
      const dummyProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 38
        },
        {
          ...generateOneProduct(),
          price: 300, // 57
        },
        {
          ...generateOneProduct(),
          price: 0, // 0
        },
        {
          ...generateOneProduct(),
          price: -500, // 0
        }
      ];

      productService.getAll()
        .subscribe(products => {
          // Assert
          expect(products.length).toEqual(dummyProducts.length);
          expect(products[0].taxes).toEqual(19);
          expect(products[1].taxes).toEqual(38);
          expect(products[2].taxes).toEqual(57);
          expect(products[3].taxes).toEqual(0);
          expect(products[4].taxes).toEqual(0);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });

    it('should send query params with limit 10 and offset 2', (doneFn) => {
      // Arrange
      const dummyProducts = generateProducts(5);
      const limit = 10;
      const offset = 2;
      productService.getAll(limit, offset)
        .subscribe(products => {
          // Assert
          expect(products.length).toEqual(dummyProducts.length);
          //expect(products).toEqual(dummyProducts);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
    });
  });

  describe('test for create', () => {
    it('should create a product', (doneFn) => {
      // Arrange
      const dummyProduct = generateOneProduct();
      const dummyCreateProductDTO: CreateProductDTO = {
        ...dummyProduct,
        categoryId: dummyProduct.category.id
      };

      productService.create({...dummyCreateProductDTO})
        .subscribe(product => {
          // Assert
          expect(product).toEqual(dummyProduct);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dummyCreateProductDTO);
      expect(req.request.method).toBe('POST');
      req.flush(dummyProduct);
    });
  });

  fdescribe('test for update', () => {
    it('should update a product', (doneFn) => {
      // Arrange
      const dummyProduct = generateOneProduct();
      const dummyUpdateProductDTO: CreateProductDTO = {
        ...dummyProduct,
        categoryId: dummyProduct.category.id
      };

      productService.update(dummyProduct.id.toString(), {...dummyUpdateProductDTO})
        .subscribe(product => {
          // Assert
          expect(product).toEqual(dummyProduct);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products/${dummyProduct.id}`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dummyUpdateProductDTO);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyProduct);
    });
  });

  fdescribe('test for delete', () => {
    it('should delete a product', (doneFn) => {
      // Arrange
      const dummyProductResponse = true;
      const productId = '1';

      productService.delete(productId)
        .subscribe(product => {
          // Assert
          expect(product).toEqual(dummyProductResponse);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyProductResponse);
    });
  });

});
