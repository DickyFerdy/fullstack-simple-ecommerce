import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createManyTestAddress, createTestAddress, createTestUser, getTestAddress, loginTestUser, removeAllTestAddresses, removeTestUser } from "./test-util.js";


describe('POST /api/v1/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestUser();
  });

  it('should can create new address', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .post('/api/v1/addresses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'rumah 1',
        street: 'jalan 1',
        city: 'kota 1',
        province: 'provinsi 1',
        country: 'Indonesia',
        postal_code: '12345'
      });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.address_id).toBeDefined();
    expect(result.body.data.title).toBe('rumah 1');
    expect(result.body.data.street).toBe('jalan 1');
    expect(result.body.data.city).toBe('kota 1');
    expect(result.body.data.province).toBe('provinsi 1');
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.postal_code).toBe('12345');
  });

  it('should reject if request is invalid', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .post('/api/v1/addresses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'rumah 1',
        street: 'jalan 1'
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });
});


describe('GET /api/v1/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestUser();
  });

  it('should can get all the addresses', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/addresses')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('/api/v1/addresses')
      .set('Authorization', `Bearer salah`);

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});


describe('GET /api/v1/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestUser();
  });

  it('should can get address by id', async () => {
    const token = await loginTestUser();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/v1/addresses/${testAddress.address_id}`)
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.address_id).toBeDefined();
    expect(result.body.data.title).toBe('rumah 1');
    expect(result.body.data.street).toBe('jalan 1');
    expect(result.body.data.city).toBe('kota 1');
    expect(result.body.data.province).toBe('provinsi 1');
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.postal_code).toBe('123451');
  });

  it('should reject if address is not found', async () => {
    const token = await loginTestUser();
    
    const result = await supertest(web)
      .get('/api/v1/addresses/1')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });
});


describe('PUT /api/v1/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestUser();
  });

  it('should can update existing address', async () => {
    const token = await loginTestUser();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/v1/addresses/${testAddress.address_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test',
        street: 'jalan test',
        city: 'kota test',
        province: 'provinsi test',
        country: 'negara test',
        postal_code: '61256'
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.address_id).toBeDefined();
    expect(result.body.data.title).toBe('test');
    expect(result.body.data.street).toBe('jalan test');
    expect(result.body.data.city).toBe('kota test');
    expect(result.body.data.province).toBe('provinsi test');
    expect(result.body.data.country).toBe('negara test');
    expect(result.body.data.postal_code).toBe('61256');
  });

  it('should reject if request is not valid', async () => {
    const token = await loginTestUser();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/v1/addresses/${testAddress.address_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        postal_code: 'salah'
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});


describe('DELETE /api/v1/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestUser();
  });

  it('should can remove existing address', async () => {
    const token = await loginTestUser();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(`/api/v1/addresses/${testAddress.address_id}`)
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('Remove Successfully');

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });
});