'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { refreshToken } from "@/libs/refreshToken";
import registerAPI from "@/libs/registerAPI";
import Register from "@/components/register";


const Page = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerAPI(formData);
      push('/login');
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const { accessToken } = await refreshToken();
      
        if (accessToken && pathname === '/register') {
          push('/');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    getToken();
  }, []);


  return (
    <Register handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
  );
};

export default Page;