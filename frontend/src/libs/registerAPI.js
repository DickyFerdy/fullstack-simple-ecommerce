import axios from "axios";

const registerAPI = async (formData) => {
  await axios.post('http://localhost:5000/api/v1/register', formData, {
    headers: {'Content-Type': 'application/json'}
  });
}

export default registerAPI;