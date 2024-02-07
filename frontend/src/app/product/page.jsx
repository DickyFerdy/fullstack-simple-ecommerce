import Sidebar from "@/components/sidebar/sidebar";
import MainTitle from "@/components/ui/title/mainTitle";
import Link from "next/link";


const Page = () => {
  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex justify-between items-center">
            <MainTitle title={"My Product"} />
            <div className="flex flex-col items-center justify-center text-sm">
              <p className="text-slate-700">Need sell something?</p>
              <Link href={'/product/create'} className="text-blue-500 hover:text-blue-600 hover:underline">Sell Here!</Link>
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6 text-slate-700">
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page;