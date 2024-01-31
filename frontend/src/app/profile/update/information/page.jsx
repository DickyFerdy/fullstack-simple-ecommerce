'use client';

import Sidebar from "@/components/sidebar/sidebar";
import { refreshToken } from "@/libs/refreshToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserAPI, updateUserAPI } from "@/libs/userAPI";
import ContentTitle from "@/components/ui/title/contentTitle";
import MainTitle from "@/components/ui/title/mainTitle";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";

const Page = () => {
  const { push } = useRouter();

  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
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
      await updateUserAPI(token, formData);
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
      const getUser = async () => {
        try {
          const { username } = await getUserAPI(token);
          setFormData({ username });
        } catch (error) {
          console.log(error.message);
        }
      };

      getUser();
    }
  }, [token]);

  return (
    <div className="flex h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MainTitle title={"Update Profile"} />
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                <ContentTitle title={"Update Profile Information"} />
                <div className="p-6 pt-0">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label name={"Name"} />
                      <Input id={"name"} type={"text"} name={"name"} placeholder={"John Doe"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label name={"Email"} />
                      <Input id={"email"} type={"email"} name={"email"} placeholder={"johndoe@mail.com"} onChange={handleChange} />
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
  );
};

export default Page;
