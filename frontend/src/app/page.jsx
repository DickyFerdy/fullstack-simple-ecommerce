import Sidebar from "@/components/sidebar/sidebar";

const Home = () => {
  return (
    <div className="flex h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <h1 className="text-black md:ml-64">Ini Homepage</h1>
    </div>
  )
}

export default Home;