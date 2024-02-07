'use client';

import Link from "next/link";
import { Cat, Blocks, LogOut, User, ShoppingBasket } from "lucide-react";
import { lato } from "@/components/ui/fonts/fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { refreshToken } from "@/libs/refreshToken";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import logoutAPI from "@/libs/logoutAPI";


export default function Sidebar() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const { accessToken } = await refreshToken();
      setToken(accessToken); 
    } catch (error) {
      push('/login');
      console.log(error.message);
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logoutAPI(token);
      push('/login');
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="w-full md:fixed top-0 left-0 md:h-screen flex-none md:w-64">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-center justify-start rounded-md bg-blue-600 p-4 md:h-40"
          href="/" title="Purrchase Palace"
        >
          <div className="w-32 text-white md:w-40">
            <div
              className={`flex flex-row md:flex-col md:items-start items-center gap-1 leading-none text-white`}
            >
              <Cat size={44} className="rotate-[15deg]" />
              <p className={`${lato.className} text-[20px] md:text-[32px]`}>
                Purrchase Palace
              </p>
            </div>
          </div>
        </Link>
        <div className="flex grow text-gray-700 flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <Link
            href={"/profile"} title="Profile"
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-base font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname.includes('/profile')
              }
            )}
          >
            <User className="w-6" />
            <p className="hidden md:block">Profile</p>
          </Link>
          <Link
            href={"/categories"} title="Categories"
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-base font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname.includes('/categories')
              }
            )}
          >
            <Blocks className="w-6" />
            <p className="hidden md:block">Categories</p>
          </Link>
          <Link
            href={"/product"} title="My Product"
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-base font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === '/product'
              }
            )}
          >
            <ShoppingBasket className="w-6" />
            <p className="hidden md:block">My Product</p>
          </Link>
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form onSubmit={handleLogout}>
            <button title="Logout" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-base font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <LogOut className="w-6" />
              <div className="hidden md:block">Log Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
