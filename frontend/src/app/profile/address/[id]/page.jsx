'use client';

import { deleteAddressByIdAPI, getAddressByIdAPI } from "@/libs/addressAPI";
import { refreshToken } from "@/libs/refreshToken";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Address from "@/components/address/index";
import delay from "@/utils/delay";


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

  const handleDelete = async () => {
    try {
      await deleteAddressByIdAPI(token, id);
      push('/profile');
    } catch (error) {
      console.log(error.message);
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
          console.log(error.message);
        }
      }

      getAddress();
    }
  }, [token]);

  return (
    <Suspense fallback={<Loading />}>
      {delay(<Address address={address} id={id} handleDelete={handleDelete} />, 100)}
    </Suspense>
  )
}

export default Page;