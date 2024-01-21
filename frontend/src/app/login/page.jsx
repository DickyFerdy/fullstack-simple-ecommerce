'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { refreshToken } from "@/libs/refreshToken";
import loginAPI from '@/libs/loginAPI';
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";


const Page = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginAPI(formData);
      push('/');
    } catch (error) {
      setError(error.response?.data.error);
    }
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await refreshToken();
      
        if (token && pathname === '/login') {
          push('/');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    getToken();
  }, []);


  return (
    <div className="w-full h-screen bg-gray-50" >
      <main className="flex flex-col justify-center items-center h-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-[#2d3547] shadow-sm w-full max-w-md mx-auto space-y-6">
          <div className="space-y-1.5 p-4">
            <h2 className="mt-6 text-center text-4xl font-extrabold text-[#e0e0e0]">
              Log In
            </h2>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label name={"Username"} />
                <Input id={"username"} type={"text"} name={"username"} placeholder={"johndoe"} onChange={handleChange} />
              </div>
              <div>
                <Label name={"Password"} />
                <Input id={"password"} type={"password"} name={"password"} placeholder={"password"} onChange={handleChange} />
              </div>
              <div className="text-center text-red-500 text-sm font-medium">
                {
                  error ? <p>{error}</p> : <p><br></br></p>
                }
              </div>
              <div>
                <Button name={"Login"} />
              </div>
              <div className="flex items-center justify-center text-base">
                <p className="font-medium text-[#e0e0e0] mr-1">
                  Don't have an account?
                </p>
                <a className="font-medium text-blue-600 hover:text-blue-500 underline" href="register">
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;