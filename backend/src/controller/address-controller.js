import addressService from "../service/address-service.js";


const create = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const address = req.body;

    const result = await addressService.create(userId, address);
    res.status(201).json({
      data: result
    });
  } catch (error) {
    next(error);
  };
};


const list = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const result = await addressService.list(userId);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  };
};


const get = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const addressId = req.params.addressId;
    
    const result = await addressService.get(userId, addressId);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  };
};


const update = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const addressId = req.params.addressId;
    const address = req.body;
    
    const result = await addressService.update(userId, addressId, address);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  };
};


const remove = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const addressId = req.params.addressId;

    await addressService.remove(userId, addressId);
    res.status(200).json({
      data: "Remove Successfully"
    });
  } catch (error) {
    next(error);
  }
};


export default {
  create,
  list,
  get,
  update,
  remove
};