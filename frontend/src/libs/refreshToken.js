import axios from "axios";

const refreshToken = async () => {
  const response = await axios.get(`http://localhost:5000/api/v1/token`, {
    withCredentials: true,
  });
  
  return response.data.data;
}

export {
  refreshToken 
};
