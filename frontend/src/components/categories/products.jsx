import Sidebar from "@/components/sidebar/sidebar";
import MainTitle from "@/components/ui/title/mainTitle";
import ProductList from "@/components/products";


const Products = ({ categoryName, product }) => {
  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MainTitle title={`${categoryName.replace('%26', ' & ')} Category`} />
          <ProductList api={product} />
        </main>
      </div>
    </div>
  )
}

export default Products;