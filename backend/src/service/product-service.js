import { validate } from "../validation/validation.js";
import { createProductValidation, productsByCategoryValidation, searchProductValidation } from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";


const create = async (userId, request) => {
  const product = validate(createProductValidation, request);
  product.user_id = userId;
  product.categories = {
    create: product.categories.map((categoryName) => ({
      category_name: categoryName
    }))
  }

  return prismaClient.product.create({
    data: product,
    select: {
      product_id: true,
      name: true,
      description: true,
      price: true,
      stock_quantity: true,
      image_path: true,
      is_active: true,
      created_at: true,
      categories: true
    }
  });
};

const search = async (request) => {
  request = validate(searchProductValidation, request);

  // page 1: (page - 1) * size = 0;
  // page 2: (page - 2) * size = 10;
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    is_active: true
  });

  if (request.name) {
    filters.push({
      name: {
        contains: request.name
      }
    });
  }

  const products = await prismaClient.product.findMany({
    where: {
      AND: filters
    },
    select: {
      product_id: true,
      name: true,
      price: true,
      image_path: true
    },
    take: request.size,
    skip: skip
  });

  const totalItems = await prismaClient.product.count({
    where: {
      AND: filters
    }
  });

  if (totalItems === 0) {
    throw new ResponseError(404, "Products is not found");
  }

  return {
    data: products,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size)
    }
  }
}

const category = async (categoryName, request) => {
  request = validate(productsByCategoryValidation, request);

  // page 1: (page - 1) * size = 0;
  // page 2: (page - 2) * size = 10;
  const skip = (request.page - 1) * request.size;

  const products = await prismaClient.product.findMany({
    where: {
      is_active: true,
      categories: {
        some: {
          category: {
            name: categoryName
          }
        }
      }
    },
    select: {
      product_id: true,
      name: true,
      price: true,
      image_path: true
    },
    take: request.size,
    skip: skip
  });

  const totalItems = await prismaClient.product.count({
    where: {
      is_active: true,
      categories: {
        some: {
          category: {
            name: categoryName
          }
        }
      }
    }
  });

  if (totalItems === 0) {
    throw new ResponseError(404, "Products is not found")
  }

  return {
    data: products,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size)
    }
  }
};

export default {
  create,
  search,
  category
}