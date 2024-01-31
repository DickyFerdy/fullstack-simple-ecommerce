'use client';

import { Suspense, useEffect, useState } from "react";
import { refreshToken } from "@/libs/refreshToken";
import { getUserAPI } from "@/libs/userAPI";
import { getAllUserAddressAPI } from "@/libs/addressAPI";
import Loading from "@/app/loading";
import Profile from "@/components/profile";
import { useRouter } from "next/navigation";
import delay from "@/utils/delay";

const Page = () => {
  const { push } = useRouter();
  const [token, setToken] = useState('');
  const [address, setAddress] = useState([]);
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
  });

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
          const { name, username, email } = await getUserAPI(token);
          setData({ name, username, email });
        } catch (error) {
          console.log(error.message);
        }
      };

      const getAddress = async () => {
        try {
          const response = await getAllUserAddressAPI(token);
          setAddress(response);
        } catch (error) {
          console.log(error.message);
        }
      };
      
      getUser();
      getAddress();
    }
  }, [token]);

  return (
    <Suspense fallback={<Loading />}>
      {delay(<Profile name={data.name} username={data.username} email={data.email} address={address} />, 300)}
    </Suspense>
  );
};

export default Page;
