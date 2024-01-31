import axios from "axios";

const logoutAPI = async (token) => {
  await axios.delete('http://localhost:5000/api/v1/logout', {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export default logoutAPI;