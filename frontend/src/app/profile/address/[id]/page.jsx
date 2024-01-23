'use client';

import Sidebar from "@/components/sidebar/sidebar";
import MainTitle from "@/components/ui/title/mainTitle";
import { deleteAddressByIdAPI, getAddressByIdAPI } from "@/libs/addressAPI";
import { refreshToken } from "@/libs/refreshToken";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotFound from "@/components/notFound";
import Image from "next/image";


const Page = ({ params: { id } }) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [address, setAddress] = useState({
    title: '',
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: ''
  });

  const handleDelete = async () => {
    try {
      await deleteAddressByIdAPI(token, id);
      push('/profile');
    } catch (error) {
      console.log(error.message);
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
          setLoading(false);
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      }

      getAddress();
    }
  }, [token]);

  return (
    <>
      { loading ? (
        <div className="flex w-screen h-screen items-center justify-center bg-white">
          <Image src={"/loading.svg"} width='0' height='0' alt="loading" style={{ width: 'auto', height: 'auto' }} />
        </div>
      ) : address.title.trim() !== '' ? (
        <div className="flex h-max bg-white flex-col md:flex-row md:overflow-hidden">
          <Sidebar />
          <div className="flex h-screen md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <MainTitle title={"Shipping Address"} />
              <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
                <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm pb-6">
                  <div className="flex justify-between space-y-1.5 p-6">
                    <div className="text-2xl font-semibold">
                        Shipping Address {address.title}
                    </div>
                    <div className="flex gap-4">
                      <div className="hover:scale-110 transition-all">
                        <Link href={`/profile/address/update/${id}`} title="Update">
                          <RefreshCcw size={18} />
                        </Link>
                      </div>
                      <div className="hover:scale-110 transition-all">
                        <button type="submit" title="Delete" onClick={handleDelete}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-slate-700 space-y-1.5 px-6">        
                    <p className="leading-none">
                      {address.street},
                    </p>
                    <p className="leading-none">
                      {address.city}, {address.province} {address.postal_code}
                    </p>
                    <p className="leading-none">
                      {address.country}.
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default Page;