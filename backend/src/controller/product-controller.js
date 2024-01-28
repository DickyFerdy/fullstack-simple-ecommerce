import productService from "../service/product-service.js";

const create = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const product = req.body;

    const result = await productService.create(userId, product);
    res.status(201).json({
      data: result
    });
  } catch (error) {
    next(error);
  };
};

const search = async (req, res, next) => {
  try {
    const request = {
      name: req.query.name,
      page: req.query.page,
      size: req.query.size
    }

    const result = await productService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging
    });
  } catch (error) {
    next(error);
  };
};

const category = async (req, res, next) => {
  try {
    const categoryName = req.params.categoryName;
    const request = {
      page: req.query.page,
      size: req.query.size
    }

    const result = await productService.category(categoryName, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging
    });
  } catch (error) {
    next(error);
  };
};

export default {
  create,
  search,
  category,
}