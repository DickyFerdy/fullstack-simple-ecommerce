'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { refreshToken } from "@/libs/refreshToken";
import { createAddressAPI, getAllUserAddressAPI } from "@/libs/addressAPI";
import Loading from "@/app/loading";
import Create from "@/components/address/create";


const Page = () => {
  const { push } = useRouter();
  const [token, setToken] = useState('');
  const [address, setAddress] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAddressAPI(token, formData);
      push('/profile');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const { accessToken } = await refreshToken();
        setToken(accessToken);
      } catch (error) {
        push('/login');
        console.log(error.message);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const getAddress = async () => {
        try {
          const response = await getAllUserAddressAPI(token);
          setAddress(response);
        } catch (error) {
          console.log(error.message);
        }
      };
      
      getAddress();
    }
  }, [token]);

  return (
    <Suspense fallback={<Loading />}>
      <Create address={address} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
    </Suspense>
  )
}

export default Page;