import axios from "axios";

const APIBaseUrl = 'http://localhost:5000/api/v1';

const getAllCategoriesAPI = async (token) => {
  const response = await axios.get(`${APIBaseUrl}/categories`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`
    }
  });

  return response;
};

export {
  getAllCategoriesAPI
}