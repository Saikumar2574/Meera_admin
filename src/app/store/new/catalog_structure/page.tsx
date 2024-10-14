"use client";
import CatalogStructure from "@/components/repoTabs/catalog";
import ProductsListing from "@/components/repoTabs/products";
import { Button } from "@/components/ui/button";
import { Progress } from "antd";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
const router = useRouter()
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div>
      {!isSaved ? (
        <>
          <Button
            type="button"
            onClick={() => setIsSaved(true)}
            className="ml-auto flex px-6 py-3 gap-4 text-lg"
          >
            Save
          </Button>
          <CatalogStructure />
        </>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-4xl font-bold">Meera</h2>
          <p className="font-bold text-xl mt-7">Data processing :</p>
          <Progress
            strokeColor="green"
            percent={50}
            strokeLinecap="butt"
            size={["100%", 60]}
            className="text-white"
          />

          <p className="font-bold text-xl mt-6">Issues Found : None</p>
          <ProductsListing />
          <Button
            type="button"
            onClick={()=>router.push("/store/new/review")}
            className="ml-auto flex px-6 py-3 gap-4 text-lg"
          >
            Next <MoveRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default page;
