'use client';

import Home from "@/components/home";
import { refreshToken } from "@/libs/refreshToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProductsAPI } from "@/libs/productsAPI";



const Page = () => {
  const { push } = useRouter();
  const [token, setToken] = useState('');
  const [product, setProduct] = useState([]);

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
      const getProduct = async () => {
        try {
          const response = await getAllProductsAPI(token);
          setProduct(response);
        } catch (error) {
          console.log(error.message);
        }
      }

      getProduct();
    }
  }, [token]);


  return (
    <Home product={product} />
  )
}

export default Page;