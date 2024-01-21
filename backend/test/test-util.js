import supertest from "supertest";
import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";
import { web } from "../src/application/web.js";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test"
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data:{
      name: "test",
      username: "test",
      email: "test@mail.com",
      password: await bcrypt.hash("rahasia", 10)
    }
  });
};

export const loginTestUser = async () => {
  const login = await supertest(web)
    .post("/api/v1/login")
    .send({
      username: "test",
      password: "rahasia"
    });

  const token = login.body.data.accessToken;
  return token;
};

export const getTestUser = async () => {
  return prismaClient.user.findFirst({
    where: {
      username: "test"
    }
  });
};

export const removeAllTestAddresses = async () => {
  return prismaClient.address.deleteMany({
    where: {
      user: {
        username: 'test'
      }
    }
  });
};

export const createManyTestAddress = async () => {
  for (let i = 0; i < 10; i++) {
    const user = await getTestUser();

    await prismaClient.address.create({
      data: {
        user_id: user.user_id,
        title: `rumah ${i}`,
        street: `jalan ${i}`,
        city: `kota ${i}`,
        province: `provinsi ${i}`,
        country: `Indonesia`,
        postal_code: `12345${i}`
      }
    });
  };
};

export const createTestAddress = async () => {
  const user = await getTestUser();

  return prismaClient.address.create({
    data: {
      user_id: user.user_id,
      title: `rumah 1`,
      street: `jalan 1`,
      city: `kota 1`,
      province: `provinsi 1`,
      country: `Indonesia`,
      postal_code: `123451`
    }
  });
};

export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      user: {
        username: 'test'
      }
    }
  });
};