import Sidebar from "@/components/sidebar/sidebar";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


const Detail = ({ product }) => {
  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
          <div className="flex flex-col px-2 md:px-6 gap-5">
            <div className="flex justify-center items-center">
              <div className="max-h-[430px]">
                <Image
                  alt="Product Image"
                  className="object-cover border max-h-[420px] border-gray-200 w-full rounded-lg overflow-hidden"
                  src={product.image_path}
                  height={300}
                  width={600}
                  priority={true}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start text-gray-900">
              <div className="flex md:items-start w-full">
                <div className="flex flex-col gap-4 flex-grow">
                  <div className="flex">
                    <h1 className="font-bold text-2xl mr-4 md:text-4xl w-full">{product.name}</h1>
                    <h2 className="text-2xl md:text-4xl font-bold">${product.price}</h2>
                  </div>
                  <div className="text-sm">
                    <span className="italic font-medium">About this item:</span>
                    <p className="md:text-base">{product.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-medium text-sm italic">category:</span>
                <div className="grid grid-cols-3 md:flex gap-2">
                  {product.product_categories.map((category) => {
                    return (
                      <Link href={'/'} className="bg-gray-500 text-white text-center text-xs rounded-sm px-2 italic">{category}</Link>
                      )
                    })}
                </div>
              </div>
              <Button name={"Add to cart"} />
              {/* <div className="flex justify-center items-center">
                <h2 className="text-lg font-semibold">You may also like</h2>
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Detail;