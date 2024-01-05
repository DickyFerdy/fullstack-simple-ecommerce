import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { removeTestUser, createTestUser, getTestUser, loginTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/v1/register', () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web)
      .post("/api/v1/register")
      .send({
        name: "test",
        username: "test",
        password: "rahasia",
        email: "test@mail.com"
      });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(web)
      .post("/api/v1/register")
      .send({
        name: "",
        username: "",
        password: "",
        email: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if username already registered', async () => {
    let result = await supertest(web)
      .post("/api/v1/register")
      .send({
        name: "test",
        username: "test",
        password: "rahasia",
        email: "test@mail.com"
      });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/v1/register").send({
      name: "test",
      username: "test",
      password: "rahasia",
      email: "test@mail.com"
    });

    logger.info(result.body);

    expect(result.status).toBe(409);
    expect(result.body.error).toBeDefined();
  });
});

describe('POST /api/v1/login', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post("/api/v1/login")
      .send({
        username: "test",
        password: "rahasia"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.accessToken).toBeDefined();
    expect(result.body.data.accessToken).not.toBe("test");
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(web)
      .post("/api/v1/login")
      .send({
        username: "",
        password: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if username is not found', async () => {
    const result = await supertest(web)
      .post("/api/v1/login")
      .send({
        username: "salah",
        password: "salah"
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if password is wrong', async () => {
    const result = await supertest(web)
      .post("/api/v1/login")
      .send({
        username: "test",
        password: "salah"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});

describe('GET /api/v1/users', () => {
  beforeEach(async () => {
    await createTestUser(); 
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .get("/api/v1/users")
      .set('Authorization', `Bearer ${token}`);

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.email).toBe('test@mail.com');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get("/api/v1/users")   
      .set('Authorization', 'Bearer salah');
      
    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});

describe('PATCH /api/v1/users', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can update user', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .patch("/api/v1/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "dicky",
        email: "test@gmail.com",
        password: "rahasialagi"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.name).toBe("dicky");

    const user = await getTestUser();
    expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true);
  });

  it('should can update user name', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .patch("/api/v1/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "dicky"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("dicky");
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
  });

  it('should can update user email', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .patch("/api/v1/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: "dicky@gmail.com"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("dicky@gmail.com");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.username).toBe("test");
  });

  it('should can update user password', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .patch("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        password: "rahasialagi"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.username).toBe("test");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  });

  it('should reject if request is not valid', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .patch("/api/v1/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: "email" 
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it('should reject if email is already used', async () => {
    const token = await loginTestUser();

    const result = await supertest(web)
      .patch("/api/v1/users")
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: "test@mail.com"
      });

    logger.info(result.body);

    expect(result.status).toBe(409);
    expect(result.body.error).toBeDefined();
  });
});
