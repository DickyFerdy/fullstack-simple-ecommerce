import Sidebar from "@/components/sidebar/sidebar";
import ProductList from "@/components/products";


const Home = ({ product }) => {
  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
          <ProductList api={product} />
        </main>
      </div>
    </div>
  )
}

export default Home;