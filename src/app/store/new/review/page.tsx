"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
const router = useRouter()
  return (
    <div>
      <div className="flex">
        <div className="flex-1"></div>
        <div className="flex-1 flex flex-col gap-8">
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="backend_url">Backend Url</Label>
            <Input
              name="backend_url"
              type="text"
              //   value={details.storeName}
              //   onChange={handleInputChange}
              disabled
              placeholder="http://localhost:3001/store/new/review"
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="description">Store Url</Label>
            <Input
              name="description"
              type="text"
              disabled
              placeholder="http://localhost:3001/store/new/review"
              //   value={details.description}
              //   onChange={handleInputChange}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-2xl">Test Crudentials : </h3>
            <p className="font-bold text-lg">Login Id : 00000000</p>
            <p className="font-bold text-lg">Password: *******</p>
          </div>
          <Button
            type="button"
            onClick={() => router.push("/store/insights")}
            className="ml-auto flex px-6 py-3 gap-4 text-lg"
          >
            Next <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
