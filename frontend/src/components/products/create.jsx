'use client';

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import Sidebar from "@/components/sidebar";
import MainTitle from "@/components/ui/title/mainTitle";
import ContentTitle from "@/components/ui/title/contentTitle";
import React, { useState } from 'react';
import Categories from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import { ImageIcon, UploadIcon } from "lucide-react";
import Image from "next/image";


const Create = ({ categories, handleChange, handleSubmit, error, setImagePath }) => {
  const [image, setImage] = useState('');

  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex h-full md:ml-64 md:w-full flex-col md:flex-row px-3 py-4 md:px-2">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MainTitle title={"New Product"} />
          <div className="flex flex-col md:grid md:grid-cols-6 gap-6 text-slate-700">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg text-slate-700 border border-slate-300 shadow-sm">
                <ContentTitle title={"Create New Product"} />
                <div className="p-6 pt-0">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Input id={"name"} type={"text"} name={"name"} placeholder={"Title.. (e.g. New Adidas Shirt)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <TextArea id={"description"} name={"description"} placeholder={"Description.. (e.g. Brand new adidas limited edition)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex">
                        <span className="flex items-center justify-center w-5">$</span>
                        <Input id={"price"} type={"number"} name={"price"} placeholder={"Price.. (e.g. 20,10)"} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Input id={"stock_quantity"} type={"number"} name={"stock_quantity"} placeholder={"Quantity.. (e.g. 100)"} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Categories categories={categories} handleChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-center items-center max-h-64">
                        { image ?
                          <Image
                            src={image}
                            width={200}
                            height={100}
                            alt="..."
                            className="max-h-full max-w-80 scale-75"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg"
                          /> :
                          <div className="flex flex-col justify-center items-center gap-1 border border-dashed border-gray-400 w-64 h-36 pb-4">
                            <ImageIcon size={44} strokeWidth={'1.2px'} className="text-gray-400" />
                            <p className="text-sm text-gray-400">Your image will be shown here</p>
                          </div>
                        }
                      </div>
                      <UploadButton
                        content={{
                          button({ ready }) {
                            if (ready) {
                              return (
                                <div className="flex gap-2">
                                <UploadIcon size={20} />
                                <p>Upload Image</p>
                              </div>
                            )
                          }
                          },
                          allowedContent({ ready }) {
                            if (ready) return "Max size (2MB)";
                          }
                        }}
                        appearance={{
                          allowedContent: {
                            'font-size': '13px'
                          }
                        }}
                        className="custom-class"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setImagePath(res[0].url);
                          setImage(res[0].url);
                          alert("Upload Completed");
                        }}
                        onUploadError={(error) => {
                          console.log(`ERROR! ${error.message}`);
                        }}
                      />
                    </div>
                    <div className="text-center text-red-500 text-sm font-medium hover:">
                      { error ? (
                          <p>{error}</p>
                        ) : null
                      }
                    </div>
                    <Button name={"Add product"} handle={handleSubmit} />
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