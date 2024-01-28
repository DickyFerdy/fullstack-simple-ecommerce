import categoryService from "../service/category-service.js";

const get = async (_, res, next) => {
  try {
    const result = await categoryService.get();
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get
};