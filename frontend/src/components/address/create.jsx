import Sidebar from "@/components/sidebar/sidebar";
import MainTitle from "@/components/ui/title/mainTitle";
import ContentTitle from "@/components/ui/title/contentTitle";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";


const Create = ({ address, handleSubmit, handleChange, error }) => {
  return (
    <div className="flex h-max md:h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MainTitle title={"Shipping Address"} />
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                <ContentTitle title={"Create Shipping Address"} />
                <div className="p-6 pt-0">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Input id={"title"} type={"text"} name={"title"} placeholder={"Title.. (e.g. House 1)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <TextArea id={"street"} name={"street"} placeholder={"Street.. (e.g. Main Street 10)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Input id={"city"} type={"text"} name={"city"} placeholder={"City.. (e.g. New York)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Input id={"province"} type={"text"} name={"province"} placeholder={"State/Province.. (e.g. New York)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Input id={"country"} type={"text"} name={"country"} placeholder={"Country.. (e.g. United States)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Input id={"postal_code"} type={"number"} name={"postal_code"} placeholder={"Postal code.. (e.g. 12345)"} onChange={handleChange} />
                    </div>
                    <div className="text-center text-red-500 text-sm font-medium">
                      { error ? (
                          <p>{error}</p>
                        ) : address.data?.data?.length >= 4 ? (
                          <p>You cannot add a new address. Please change or delete an existing one.</p>
                        ) : null
                      }
                    </div>
                    <div>
                      { address.data?.data?.length >= 4 ?
                        <Button name={"Submit"} handle={handleSubmit} disabled={true} /> :
                        <Button name={"Submit"} handle={handleSubmit} />
                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Create;