'use client';

import Sidebar from "@/components/sidebar/sidebar";
import { refreshToken } from "@/libs/refreshToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserAPI, updateUserAPI } from "@/libs/userAPI";

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
      const response = await refreshToken();
      setToken(response);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const response = await getUserAPI(token);
          setFormData({
            username: response.data.data.username,
          });
        } catch (error) {
          console.log(error.message);
        }
      };

      getUser();
    }
  }, [token]);

  return (
    <div className="flex h-max md:h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-xl">
              <span className="font-normal text-gray-500 dark:text-gray-400">
                Update Profile
              </span>
            </h1>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="text-2xl font-semibold leading-none tracking-tight">
                    Update Profile Information
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="name"
                        autoComplete="name"
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="email"
                        autoComplete="email"
                        type="email"
                        name="email"
                        placeholder="email address"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Shipping Address
                      </label>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="address"
                        autoComplete="address"
                        type="text"
                        name="address"
                        placeholder="shipping address"
                        // value={formData.email}
                        // onChange={handleChange}
                      />
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
                    <div className="grid gap-2">
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-400 text-white h-9 rounded-md px-3"
                      >
                        Update Profile
                      </button>
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
