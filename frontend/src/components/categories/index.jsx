import Sidebar from "@/components/sidebar/sidebar";
import MainTitle from "@/components/ui/title/mainTitle";
import { BookIcon, DribbbleIcon, FilmIcon, GamepadIcon, LaptopIcon, PuzzleIcon, ShirtIcon, SofaIcon, UtensilsIcon, WatchIcon } from "lucide-react";
import Link from "next/link";


const Categories = () => {
  return (
    <div className="flex h-max bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MainTitle title={"Categories"} />
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <WatchIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Accessories</h3>
              <Link href={'/categories/Accessories'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6">View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <BookIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Books</h3>
              <Link href={'/categories/Books'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <LaptopIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Electronics</h3>
              <Link href={'/categories/Electronics'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <FilmIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Entertainment</h3>
              <Link href={'/categories/Entertainment'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <ShirtIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Fashion</h3>
              <Link href={'/categories/Fashion'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <SofaIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Furniture</h3>
              <Link href={'/categories/Furniture'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <UtensilsIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Household</h3>
              <Link href={'/categories/Household'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <DribbbleIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Sports</h3>
              <Link href={'/categories/Sports'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <GamepadIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Toys & Games</h3>
              <Link href={'/categories/Toys&Games'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
              <PuzzleIcon className="h-12 w-12 text-gray-900" strokeWidth="1.5px" />
              <h3 className="font-semibold text-lg md:text-xl mt-4 mb-2 text-slate-700">Others</h3>
              <Link href={'/categories/Others'} className="flex items-center justify-center bg-blue-600 transition-colors hover:bg-blue-500 text-white text-sm h-9 rounded-md px-6" >View Products</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Categories;