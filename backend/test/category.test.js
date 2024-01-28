import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, loginTestUser, removeTestUser } from "./test-util";

describe('GET /api/v1/categories', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get all categories', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get('/api/v1/categories')
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
  });

  it('should reject if token is invalid or not provided', async () => {
    const result = await supertest(web)
      .get('/api/v1/categories')
      .set('Authorization', 'Bearer salah');

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});