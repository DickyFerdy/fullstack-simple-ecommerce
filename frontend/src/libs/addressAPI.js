import axios from "axios";

const APIBaseUrl = 'http://localhost:5000/api/v1';

const getAllUserAddressAPI = async (token) => {
  const response = await axios.get(`${APIBaseUrl}/addresses`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });

  return response;
};

const createAddressAPI = async (token, formData) => {
  const response = await axios.post(`${APIBaseUrl}/addresses`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response;
};

const getAddressByIdAPI = async (token, id) => {
  const response = await axios.get(`${APIBaseUrl}/addresses/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response.data.data;
};

const deleteAddressByIdAPI = async (token, id) => {
  const response = await axios.delete(`${APIBaseUrl}/addresses/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response;
};

const updateAddressByIdAPI = async (token, id, formData) => {
  const response = await axios.put(`${APIBaseUrl}/addresses/${id}`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response;
};

export {
  getAllUserAddressAPI,
  createAddressAPI,
  getAddressByIdAPI,
  deleteAddressByIdAPI,
  updateAddressByIdAPI
}