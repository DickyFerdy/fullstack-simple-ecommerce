import { validate } from "../validation/validation.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js";
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";


const create = async (userId, request) => {
  const address = validate(createAddressValidation, request);
  address.user_id = userId;

  return prismaClient.address.create({
    data: address,
    select: {
      address_id: true,
      title: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });
};


const list = async (userId) => {
  return prismaClient.address.findMany({
    where: {
      user_id: userId
    },
    select: {
      address_id: true,
      title: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });
};


const get = async (userId, addressId) => {
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      user_id: userId,
      address_id: addressId
    },
    select: {
      address_id: true,
      title: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });

  if (!address) {
    throw new ResponseError(404, "Address is not found");
  }

  return address;
};


const update = async (userId, addressId, request) => {
  addressId = validate(getAddressValidation, addressId);
  const address = validate(updateAddressValidation, request);

  return prismaClient.address.update({
    where: {
      user_id: userId,
      address_id: addressId
    },
    data: address,
    select: {
      address_id: true,
      title: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true
    }
  });
};


const remove = async (userId, addressId) => {
  addressId = validate(getAddressValidation, addressId);
  
  return prismaClient.address.delete({
    where: {
      user_id: userId,
      address_id: addressId
    }
  });
}

export default {
  create,
  list,
  get,
  update,
  remove
};