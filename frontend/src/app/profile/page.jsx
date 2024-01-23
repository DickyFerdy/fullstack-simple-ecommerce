'use client';

import { useEffect, useState } from "react";
import { CircleUserRound, Plus } from "lucide-react";
import { refreshToken } from "@/libs/refreshToken";
import Link from "next/link";
import Sidebar from "@/components/sidebar/sidebar";
import { getUserAPI } from "@/libs/userAPI";
import { AddressList } from "@/components/addresses";
import { getAllUserAddressAPI } from "@/libs/addressAPI";
import MainTitle from "@/components/ui/title/mainTitle";
import ContentTitle from "@/components/ui/title/contentTitle";
import Image from "next/image";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [address, setAddress] = useState([]);
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
  });

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
          setData({
            name: response.data.data.name,
            username: response.data.data.username,
            email: response.data.data.email,
          });
          setLoading(false);
        } catch (err) {
          console.log(err.message);
          setLoading(false);
        }
      };

      const getAddress = async () => {
        try {
          const response = await getAllUserAddressAPI(token);
          setAddress(response);
        } catch (err) {
          console.log(err.message);
        }
      };
      
      getUser();
      getAddress();
    }
  }, [token]);

  return (
    <>
      { loading ? (
        <div className="flex w-screen h-screen items-center justify-center bg-white">
          <Image src={"/loading.svg"} width='0' height='0' alt="loading" style={{ width: 'auto', height: 'auto' }} />
        </div>
      ) : (
        <div className="flex h-max md:h-screen bg-white flex-col md:flex-row md:overflow-hidden">
          <Sidebar />
          <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <MainTitle title={"User Profile"} />
              <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
                <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                  <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                    <ContentTitle title={"Profile Information"} />
                    <div className="p-6 pt-0">
                      <div className="flex items-center gap-2">
                        <div className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16 justify-center items-center">
                          <CircleUserRound size={56} strokeWidth={1.3} />
                          {/* <Image className="aspect-square h-full w-full" alt="@shadcn" src="" /> */}
                          {/* <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">JP</div> */}
                        </div>
                        <div className="grid gap-1 text-slate-700">
                          <h3 className="font-semibold">{data.name}</h3>
                          <p className="text-sm leading-none">
                            {data.username}
                          </p>
                          <p className="text-sm leading-none">
                            {data.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <div className="grid gap-2">
                    <Link href={'/profile/update/information'} title="Update Information" className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6">Update Profile</Link>
                  </div>
                  <div className="grid gap-2">
                    <Link href={'/profile/update/password'} title="Update Password" className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6">Update Password</Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm pb-6">
                  <div className="flex justify-between space-y-1.5 p-6">
                    <div className="text-2xl font-semibold">
                      Shipping Address
                    </div>
                    <div>
                      {
                        address.data?.data?.length >= 4 ?
                        null :
                        <div className="hover:scale-125 transition-all">
                          <Link href={'/profile/address/create'} title="Add New Address">
                            <Plus size={24}/>
                          </Link>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="px-4">
                    {
                      address.data?.data?.length >= 1 ?
                      <AddressList api={address}/> :
                      <div className="flex items-center justify-center">
                        <p>You don't have a shipping address</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
