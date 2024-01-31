import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-white">
      <Image src={"/loading.svg"} width='0' height='0' alt="loading" style={{ width: 'auto', height: 'auto' }} />
    </div>
  )
}

export default Loading;