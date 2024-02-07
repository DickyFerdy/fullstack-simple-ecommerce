import axios from "axios";

const APIBaseUrl = 'http://localhost:5000/api/v1';

const getAllProductsAPI = async (token) => {
  const response = await axios.get(`${APIBaseUrl}/products`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    },
  });

  return response;
};

const getProductsByCategoryAPI = async (token, categoryName) => {
  const response = await axios.get(`${APIBaseUrl}/products/category/${categoryName}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    },
  });

  return response;
};

const createProductAPI = async (token, formData) => {
  const response = await axios.post(`${APIBaseUrl}/products`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response;
};

const getProductByProductIdAPI = async (token, id) => {
  const response = await axios.get(`${APIBaseUrl}/products/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response.data.data;
}

export {
  getAllProductsAPI,
  getProductsByCategoryAPI,
  createProductAPI,
  getProductByProductIdAPI
}