import axios from "axios";

const loginAPI = async (formData) => {
  await axios.post('http://localhost:5000/api/v1/login', formData, {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });
}

export default loginAPI;