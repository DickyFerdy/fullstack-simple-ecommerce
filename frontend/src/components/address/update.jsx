'use client';

import MainTitle from "@/components/ui/title/mainTitle";
import ContentTitle from "@/components/ui/title/contentTitle";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import NotFound from "@/components/notFound";
import Sidebar from "@/components/sidebar/sidebar";


const Update = ({ address, handleChange, handleSubmit, error }) => {
  return (
    <>
      { address.title.trim() !== '' ? (
        <div className="flex h-max bg-white flex-col md:flex-row md:overflow-hidden">
          <Sidebar />
          <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <MainTitle title={"Shipping Address"} />
              <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
                <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                  <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                    <ContentTitle title={"Update Shipping Address"} />
                    <div className="p-6 pt-0">
                      <form className="grid gap-4">
                        <div className="grid gap-2">
                          <Label name={"Title"} />
                          <Input id={"title"} type={"text"} name={"title"} placeholder={address.title} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label name={"Street"} />
                          <TextArea id={"street"} name={"street"} placeholder={address.street} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label name={"City"} />
                          <Input id={"city"} type={"text"} name={"city"} placeholder={address.city} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label name={"Province"} />
                          <Input id={"province"} type={"text"} name={"province"} placeholder={address.province} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label name={"Country"}/>
                          <Input id={"country"} type={"text"} name={"country"} placeholder={address.country} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label name={"Postal Code"} />
                          <Input id={"postal_code"} type={"number"} name={"postal_code"} placeholder={address.postal_code} onChange={handleChange} />
                        </div>
                        <div className="text-center text-red-500 text-sm font-medium">
                          {error ? (
                            <p>{error}</p>
                          ) : (
                            <p>
                              <br></br>
                            </p>
                          )}
                        </div>
                        <div>
                          <Button name={"Submit"} handle={handleSubmit} />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default Update;