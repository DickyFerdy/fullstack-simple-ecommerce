import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createManyTestProducts, createManyTestProductsCategories, createTestUser, loginTestUser, removeAllTestProducts, removeTestUser } from "./test-util.js";


describe('POST /api/v1/products', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestProducts();
    await removeTestUser();
  });

  it('should can create new product', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "test",
        description: "test",
        price: 10,
        stock_quantity: 10,
        image_path: "http://example-img.jpg",
        categories: ['Fashion']
      });

    logger.info(result.body);
    const product_id = result.body.data.product_id;

    expect(result.status).toBe(201);
    expect(result.body.data.product_id).toBeDefined();
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.description).toBe('test');
    expect(result.body.data.price).toBe('10');
    expect(result.body.data.stock_quantity).toBe(10);
    expect(result.body.data.image_path).toBe('http://example-img.jpg');
    expect(result.body.data.is_available).toBe(true);
    expect(result.body.data.categories).toMatchObject([{ category_name: 'Fashion', product_id: product_id }]);
  });

  it('should reject if request is invalid', async () => {
    const token = await loginTestUser()

    const result = await supertest(web)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "test",
        description: "test",
        price: "test",
        stock_quantity: 10,
        image_path: "http://example-img.jpg",
        categories: [1, 2]
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if token is invalid or not provided', async () => {
    const result = await supertest(web)
      .post('/api/v1/products')
      .set('Authorization', `Bearer token`)
      .send({
        name: "test",
        description: "test",
        price: 10,
        stock_quantity: 10,
        image_path: "http://example-img.jpg",
        categories: ['Fashion', 'Books']
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});


describe('GET /api/v1/products', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestProducts();
  });

  afterEach(async () => {
    await removeAllTestProducts();
    await removeTestUser();
  });

  it('should can search without parameter', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search to page 2', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/products')
      .query({
        page: 2
      })
      .set('Authorization', `Bearer ${token}`);


    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search with name', async () => {
    const token = await loginTestUser();
    
    const result = await supertest(web)
      .get('/api/v1/products')
      .query({
        name: 'test 1'
      })
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should reject if token is invalid or not provided', async () => {
    const result = await supertest(web)
      .get('/api/v1/products')
      .set('Authorization', 'Bearer token');

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if products is not found', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/products')
      .query({
        name: "salah"
      })
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});

describe('GET /api/v1/products/category/:categoryName', () => {
  beforeEach(async () =>{
    await createTestUser();
    await createManyTestProducts();
    await createManyTestProductsCategories();
  });

  afterEach(async () => {
    await removeAllTestProducts();
    await removeTestUser();
  });

  it('should can get products by Fashion category', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/products/category/Fashion')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(16);
  });

  it('should can get products by Home category', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/products/category/Home')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(1);
  });

  it('should reject if token is invalid or not found', async () => {
    const result = await supertest(web)
      .get('/api/v1/products/category/Fashion')
      .set('Authorization', 'Bearer salah');

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if products is not found', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/products/category/Salah')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});