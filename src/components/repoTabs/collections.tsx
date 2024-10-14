"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

function Collections() {
  const router = useRouter();
  return (
    // <Card>
    //   <div className="flex justify-between items-center">
    //     <CardHeader>
    //       <CardTitle className="flex gap-4 items-center">
    //         Collections
    //         <RefreshCcw className="h-3.5 w-3.5 cursor-pointer" />
    //       </CardTitle>
    //     </CardHeader>
    //   </div>
    //   <CardContent>
    <>
      <h3 className="font-bold text-lg mt-6 mb-3" > Collections</h3>
      <div className="flex flex-wrap gap-8">
        <Card
          className="flex flex-col items-center group cursor-pointer text-center p-4 "
          onClick={() => router.push("/store/repository/collections/helmets")}
        >
          <img
            src="/camera.jpg"
            alt="img"
            className="w-40 h-40 object-cover mb-2 rounded-md"
          />
          <span className="capitalize text-base   text-center font-bold">
            Helmets
          </span>
          <span className="text-gray-500  text-center italic text-xs">
            Products: 100
          </span>
          {/* <div className="mt-2 flex flex-col w-full">
              <span className="capitalize text-sm py-2 cursor-pointer flex justify-between items-center">
                Featured Item <Badge>FI</Badge>
              </span>
              <hr />
              <span className="capitalize text-sm py-2 cursor-pointer flex justify-between items-center">
                Accessories <Badge>A</Badge>
              </span>
              <hr />
              <span className="capitalize text-sm py-2 cursor-pointer flex justify-between items-center">
                Helmet Maintainence <Badge>FI</Badge>
              </span>
            </div> */}
        </Card>
        <Card
          className="flex flex-col items-center group cursor-pointer text-center p-4"
          onClick={() => router.push("/store/repository/collections/jackets")}
        >
          <img
            src="/camera.jpg"
            alt="img"
            className="w-40 h-40 object-cover mb-2 rounded-md"
          />
          <span className="capitalize text-base font-bold">Jackets</span>
          <span className="text-gray-500 italic text-xs">Products: 100</span>
        </Card>
        <Card
          className="flex flex-col items-center group cursor-pointer text-center p-4"
          onClick={() => router.push("/store/repository/collections/pants")}
        >
          <img
            src="/camera.jpg"
            alt="img"
            className="w-40 h-40 object-cover mb-2 rounded-md"
          />
          <span className="capitalize text-base font-bold">Pants</span>
          <span className="text-gray-500 italic text-xs">Products: 100</span>
        </Card>
      </div>
    </>
    //   </CardContent>
    // </Card>
  );
}

export default Collections;
