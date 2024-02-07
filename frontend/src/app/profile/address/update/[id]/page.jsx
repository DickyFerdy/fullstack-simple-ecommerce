'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { refreshToken } from "@/libs/refreshToken";
import { updateAddressByIdAPI, getAddressByIdAPI,  } from "@/libs/addressAPI";
import Loading from "@/app/loading";
import Update from "@/components/address/update";


const Page = ({ params: { id } }) => {
  const { push } = useRouter();
  const [token, setToken] = useState('');
  const [address, setAddress] = useState({
    title: '',
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: ''
  });
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
      await updateAddressByIdAPI(token, id, formData);
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
          const { title, street, city, province, country, postal_code } = await getAddressByIdAPI(token, id);
          setAddress({ title, street, city, province, country, postal_code });
        } catch (error) {
          if (error.response.status === 404) {
            setError('"Address" is not found')
          }
          console.log(error.message);
        }
      };

      getAddress();
    }
  }, [token]);

  return (
    <Suspense fallback={<Loading />}>
      <Update address={address} handleChange={handleChange} handleSubmit={handleSubmit} error={error} />
    </Suspense>
  )
}

export default Page;