'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { refreshToken } from "@/libs/refreshToken";
import loginAPI from '@/libs/loginAPI';
import Login from "@/components/login";


const Page = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    username: '',
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
      await loginAPI(formData);
      push('/');
    } catch (error) {
      setError(error.response?.data.error);
    }
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const { accessToken } = await refreshToken();
      
        if (accessToken && pathname === '/login') {
          push('/');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    getToken();
  }, []);


  return (
    <Login handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
  );
};

export default Page;