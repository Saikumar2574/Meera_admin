"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { MoveLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductsListing from "./products";
function page() {
  const router = useRouter();
  const pathname = usePathname();
  const segment = pathname.split("/").pop();
  return (
    <div className="flex flex-col">
     <hr className="my-5"/>
      <header className="sticky top-0 z-30 h-14 gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-3">
            <MoveLeft
              className="cursor-pointer"
              size={26}
              onClick={() => router.back()}
            />{" "}
            <h2 className="text-2xl font-bold capitalize"> Summer Collection</h2>
          </div>
          {/* <Button className="font-semibold flex items-center gap-3"><Save size={16}/>Save Changes</Button> */}
        </div>
      </header>

      <main className=" flex-1 items-start gap-4 p-4 md:gap-8">
        {/* <Card
          className="flex flex-col items-center group cursor-pointer  p-4 max-w-52 mb-14"
        >
          <img
            src="/camera.jpg"
            alt="img"
            className="w-40 h-40 object-cover mb-2 rounded-md"
          />
          <span className="capitalize text-base   text-center font-bold">
            Summer Collection
          </span>
          <span className="text-gray-500  text-center italic text-xs">
            Products: 100
          </span>
        
        </Card> */}
        <ProductsListing/>
      </main>
    </div>
  );
}

export default page;
