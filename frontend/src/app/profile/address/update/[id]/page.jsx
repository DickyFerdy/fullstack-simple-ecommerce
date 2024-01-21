'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { refreshToken } from "@/libs/refreshToken";
import { updateAddressByIdAPI, getAddressByIdAPI,  } from "@/libs/addressAPI";
import MainTitle from "@/components/ui/title/mainTitle";
import ContentTitle from "@/components/ui/title/contentTitle";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import { FileX } from "lucide-react";
import Link from "next/link";


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
      const response = await refreshToken();
      setToken(response);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const getAddress = async () => {
        try {
          const response = await getAddressByIdAPI(token, id);
          setAddress({
            title: response.data.data.title,
            street: response.data.data.street,
            city: response.data.data.city,
            province: response.data.data.province,
            country: response.data.data.country,
            postal_code: response.data.data.postal_code,
          });
        } catch (err) {
          console.log(err.message);
        }
      };

      getAddress();
    }
  }, [token]);

  return (
    <div className="flex h-max bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      {
        address.title !== '' ?
        <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <MainTitle title={"Shipping Address"} />
            <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
              <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                  <ContentTitle title={"Update Shipping Address"} />
                  <div className="p-6 pt-0">
                    <form className="grid gap-4">
                      <div className="grid gap-2">
                        <Label name={"Title"} />
                        <Input id={"title"} type={"text"} name={"title"} placeholder={address.title} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label name={"Street"} />
                        <TextArea id={"street"} name={"street"} placeholder={address.street} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label name={"City"} />
                        <Input id={"city"} type={"text"} name={"city"} placeholder={address.city} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label name={"Province"} />
                        <Input id={"province"} type={"text"} name={"province"} placeholder={address.province} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label name={"Country"}/>
                        <Input id={"country"} type={"text"} name={"country"} placeholder={address.country} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label name={"Postal Code"} />
                        <Input id={"postal_code"} type={"number"} name={"postal_code"} placeholder={address.postal_code} onChange={handleChange} />
                      </div>
                      <div className="text-center text-red-500 text-sm font-medium">
                        {error ? (
                          <p>{error}</p>
                        ) : (
                          <p>
                            <br></br>
                          </p>
                        )}
                      </div>
                      <div>
                        <Button name={"Submit"} handle={handleSubmit} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div> :
        <div className="flex h-screen md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
          <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
              <FileX size={64} className="mb-4 text-black" />
              <h1 className="text-4xl text-center font-bold text-gray-900">Oops! Page not found.</h1>
              <p className="mt-2 text-center text-gray-600">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-8"
                href="/"
                >
                Go back home
              </Link>
            </div>
          </main>
        </div>
      }
    </div>
  )
}

export default Page;