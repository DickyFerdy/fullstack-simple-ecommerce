'use client';

import Create from "@/components/products/create";
import { getAllCategoriesAPI } from "@/libs/categoriesAPI";
import { createProductAPI } from "@/libs/productsAPI";
import { refreshToken } from "@/libs/refreshToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Page = () => {
  const { push } = useRouter();
  const [token, setToken] = useState('');
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    image_path: '',
    categories: []
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      const selectedCategories = e.map((selectedCategory) => selectedCategory.value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        categories: selectedCategories
      }));
    }
  };

  const updateImagePath = (path) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image_path: path
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProductAPI(token, formData);
      push('/');
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
      const getCategories = async () => {
        try {
          const response = await getAllCategoriesAPI(token);
          setCategories(response);
        } catch (error) {
          console.log(error.message);
        }
      }

      getCategories();
    }
  }, [token]);

  return (
    <Create categories={categories} handleChange={handleChange} handleSubmit={handleSubmit} setImagePath={updateImagePath} error={error} />
  )
}

export default Page;