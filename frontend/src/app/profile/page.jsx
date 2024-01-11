"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { refreshToken } from "@/libs/refreshToken";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const getToken = async () => {
    const response = await refreshToken();
    setToken(response);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/users`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
      setData({
        name: response.data.data.name,
        username: response.data.data.username,
        email: response.data.data.email,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
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
                User Profile
              </span>
            </h1>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="text-2xl font-semibold leading-none tracking-tight">
                    Profile Information
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex items-center gap-2">
                    <div className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16 justify-center items-center">
                      <CircleUserRound size={56} strokeWidth={1.3} />
                      {/* <Image className="aspect-square h-full w-full" alt="@shadcn" src="" /> */}
                      {/* <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">JP</div> */}
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-semibold">{data.name}</h3>
                      <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                        {data.username}
                      </p>
                      <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                        {data.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1 mt-4">
                    <h3 className="font-semibold">Shipping Address</h3>
                    <p className="text-sm leading-none">
                      1234 Main St.
                      <br />
                      Anytown, CA 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-2">
              <div className="grid gap-2">
                <button type="submit" className="bg-blue-600 hover:bg-blue-400 text-white text-sm h-9 rounded-md px-6">
                  <Link href={'/profile/update/information'}>Update Profile</Link>
                </button>
              </div>
              <div className="grid gap-2">
                <button type="submit" className="bg-blue-600 hover:bg-blue-400 text-white text-sm h-9 rounded-md px-6">
                  <Link href={'/profile/update/password'}>Update Password</Link>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
