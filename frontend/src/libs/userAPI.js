import axios from "axios";

const getUserAPI = async (token) => {
  const response = await axios.get(`http://localhost:5000/api/v1/users`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });

  return response;
}

const updateUserAPI = async (token, formData) => {
  await axios.patch('http://localhost:5000/api/v1/users', formData, {
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