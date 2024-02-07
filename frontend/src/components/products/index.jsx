import Image from 'next/image';
import Link from 'next/link';


const ProductList = ({ api }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 pt-2 md:pt-0">
      {api?.data?.data?.map((product, index) => {
        return (
          <div className="relative group overflow-hidden rounded-lg border border-slate-300 hover:scale-105 transition-all">
            <Link className="absolute inset-0 z-10" href={`/product/${product.product_id}`} title={product.name} key={index}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Product 1"
              className="object-cover w-full h-48"
              height={150}
              width={300}
              src={product.image_path}
              style={{
                objectFit: "cover",
              }}
              priority={true}
            />
            <div className="text-slate-800 p-4">
              <h3 className="font-semibold text-lg md:text-xl">{product.name}</h3>
              <h4 className="font-semibold text-base md:text-lg">${product.price}</h4>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList;