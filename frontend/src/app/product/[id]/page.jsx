'use client';

import Loading from "@/app/loading";
import Detail from "@/components/products/detail";
import { getProductByProductIdAPI } from "@/libs/productsAPI";
import { refreshToken } from "@/libs/refreshToken";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


const Page = ({ params: { id } }) => {
  const { push } = useRouter();
  const [token, setToken] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: 0,
    image_path: '',
    product_categories: []
  });

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
          const { name, description, price, stock_quantity, image_path, categories } = await getProductByProductIdAPI(token, id);
          const product_categories = categories.map((category) => category.category_name);
          setProduct({ name, description, price, stock_quantity, image_path, product_categories });
        } catch (error) {
          console.log(error.message);
        }
      }

      getProduct();
    }
  }, [token]);

  useEffect(() => {
    if (product) {
      product.product_categories.map((category) => console.log(category));
    }
  }, [product]);


  return (
    <Suspense fallback={<Loading />}>
      <Detail product={product} />
    </Suspense>
  )
}

export default Page;