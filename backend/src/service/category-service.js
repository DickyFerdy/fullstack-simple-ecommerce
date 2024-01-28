import { prismaClient } from "../application/database.js";

const get = async () => {
  return prismaClient.category.findMany({
    select: {
      category_id: true,
      name: true,
      products: true
    }
  });
};

export default {
  get
}