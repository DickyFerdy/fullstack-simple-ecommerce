import axios from "axios";

const refreshToken = async () => {
  const response = await axios.get(`http://localhost:5000/api/v1/token`, {
    withCredentials: true,
  });
  const token = await response.data.data.accessToken;
  return token;
}

export {
  refreshToken 
};
