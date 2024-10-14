"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftCircle, Folder, MoveLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductsListing from "./products";
import { Badge } from "@/components/ui/badge";
import { CustomKanban } from "@/components/ui/customKarbon";
function page() {
  const router = useRouter();
  const pathname = usePathname();
  const segment = pathname.split("/").pop();

  const helmetsData = [
    {
      name: "Full-Face Helmets",
      children: [],
    },
    {
      name: "Half-Face Helmets",
      children: [],
    },
  ];
  // Recursive Tree Node Component (Always Expanded)
  function TreeNode({ node }) {
    return (
      <div className="ml-4">
        {node.children && (
          <div className="pl-4">
            {node.children.map((child, index) => (
              <TreeNode key={index} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

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
            <h2 className="text-2xl font-bold capitalize">Back</h2>
          </div>
          <Button className="font-semibold flex items-center gap-3"><Save size={16}/>Save Changes</Button>
        </div>
      </header>

      <main className=" flex-1 items-start gap-4 p-4 md:gap-8">
        <Card
          className="flex flex-col items-center group text-center p-4 max-w-52 mb-14"
        //   onClick={() => router.push("/store/repository/collections/helmets")}
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
        <CustomKanban />
      </main>
    </div>
  );
}

export default page;
