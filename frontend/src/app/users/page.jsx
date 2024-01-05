'use client';

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState('');

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/token', {
        withCredentials: true
      });
      setToken(response.data.data.accessToken);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div>
      <h1>USERS</h1>
    </div>
  )
}

export default Page;