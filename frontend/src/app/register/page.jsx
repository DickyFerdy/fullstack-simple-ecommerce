"use client";

import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { push } = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
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
      await axios.post('http://localhost:5000/api/v1/register', formData);
      push('/login');
    } catch (error) {
      setError(error.response.data.error);
    }
  }


  return (
    <div className="w-full h-max md:h-screen bg-gray-50" >
      <main className="flex flex-col justify-center items-center h-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-[#2d3547] shadow-sm w-full max-w-md mx-auto space-y-6">
          <div className="space-y-1.5 p-4">
            <h2 className="mt-6 text-center text-4xl font-extrabold text-[#e0e0e0]">
              Register
            </h2>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="text-base text-[#e0e0e0] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Name
                </label>
                <input
                  className="h-10 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  id="name"
                  autoComplete="name"
                  required={true}
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange} />
              </div>
              <div>
                <label
                  className="text-base text-[#e0e0e0] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Username
                </label>
                <input
                  className="h-10 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  id="username"
                  autoComplete="username"
                  required={true}
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange} />
              </div>
              <div>
                <label
                  className="text-base text-[#e0e0e0] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
                </label>
                <input
                  className="h-10 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  id="email-address"
                  autoComplete="email"
                  required={true}
                  type="email"
                  name="email"
                  placeholder="email address"
                  onChange={handleChange} />
              </div>
              <div>
                <label
                  className="text-base text-[#e0e0e0] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <input
                  className="h-10 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  id="password"
                  autoComplete="current-password"
                  required={true}
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange} />
              </div>
              <div className="text-center text-red-500 text-base font-medium">
                {
                  error ? <p>{error}</p> : <p><br></br></p>
                }
              </div>
              <div>
                <button
                  className="inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  type="submit">
                  Register
                </button>
              </div>
              <div className="flex items-center justify-center text-base">
                <p className="font-medium text-[#e0e0e0] mr-1">
                  Already have an account?
                </p>
                <a className="font-medium text-blue-600 hover:text-blue-500 underline" href="/login">
                  Log In
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