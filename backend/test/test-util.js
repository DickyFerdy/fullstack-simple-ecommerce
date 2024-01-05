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
