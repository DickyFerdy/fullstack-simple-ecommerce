'use client';

import Loading from '@/app/loading';
import Products from '@/components/categories/products';
import delay from '@/utils/delay';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { refreshToken } from '@/libs/refreshToken';
import { getProductsByCategoryAPI } from '@/libs/productsAPI';


const Page = ({ params: { categoryName } }) => {
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
    }

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const getProduct = async () => {
        try {
          const response = await getProductsByCategoryAPI(token, categoryName);
          setProduct(response);
        } catch (error) {
          console.log(error.message);
        }
      }

      getProduct();
    }
  }, [token]);

  return (
    <Suspense fallback={<Loading />}>
      {delay(<Products categoryName={categoryName} product={product} />, 300)}
    </Suspense>
  )
}

export default Page;