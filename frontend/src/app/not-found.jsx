'use client';

import { FileX } from "lucide-react";
import Link from "next/link";


const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <FileX size={84} className="mb-4 text-black" />
      <h1 className="text-4xl text-center font-bold text-gray-900">Oops! Page not found.</h1>
      <p className="mt-2 text-center text-gray-600">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-8"
        href="/"
      >
        Go back home
      </Link>
    </div>
  )
}

export default Page;