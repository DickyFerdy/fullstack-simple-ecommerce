import axios from "axios";

const APIBaseUrl = 'http://localhost:5000/api/v1';

const getUserAPI = async (token) => {
  const response = await axios.get(`${APIBaseUrl}/users`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });

  return response;
}

const updateUserAPI = async (token, formData) => {
  await axios.patch(`${APIBaseUrl}/users`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export {
  getUserAPI,
  updateUserAPI
};