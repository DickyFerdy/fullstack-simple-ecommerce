'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { refreshToken } from "@/libs/refreshToken";
import { createAddressAPI } from "@/libs/addressAPI";
import MainTitle from "@/components/ui/title/mainTitle";
import ContentTitle from "@/components/ui/title/contentTitle";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";


const Page = () => {
  const { push } = useRouter();

  const [token, setToken] = useState('');
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
      const response = await refreshToken();
      setToken(response);
    };

    getToken();
  }, []);

  return (
    <div className="flex h-max bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MainTitle title={"Shipping Address"} />
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                <ContentTitle title={"Create Shipping Address"} />
                <div className="p-6 pt-0">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label name={"Title"} />
                      <Input id={"title"} type={"text"} name={"title"} placeholder={"House 1"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label name={"Street"} />
                      <TextArea id={"street"} name={"street"} placeholder={"10 Main Street"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label name={"City"} />
                      <Input id={"city"} type={"text"} name={"city"} placeholder={"New York"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label name={"Province"} />
                      <Input id={"province"} type={"text"} name={"province"} placeholder={"New York"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label name={"Country"} />
                      <Input id={"country"} type={"text"} name={"country"} placeholder={"United States"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label name={"Postal Code"} />
                      <Input id={"postal_code"} type={"number"} name={"postal_code"} placeholder={"12345"} onChange={handleChange} />
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
      </div>
    </div>
  )
}

export default Page;