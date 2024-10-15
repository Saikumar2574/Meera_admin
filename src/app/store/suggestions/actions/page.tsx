import { Input } from "@/components/ui/input";
import React from "react";

function page() {
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h2 className="text-xl font-bold">Folders</h2>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] border"
          />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="border rounded-lg flex items-center justify-center h-48 w-48">
          <span className="text-lg font-semibold">Social Media</span>
        </div>
        <div className="border rounded-lg flex items-center justify-center h-48 w-48">
          <span className="text-lg font-semibold">Social Media</span>
        </div>
        <div className="border rounded-lg flex items-center justify-center h-48 w-48">
          <span className="text-lg font-semibold">Social Media</span>
        </div>
        <div className="border rounded-lg flex items-center justify-center h-48 w-48">
          <span className="text-lg font-semibold">Social Media</span>
        </div>

        <div className="border rounded-lg flex items-center justify-center h-48 w-48">
          <span className="text-lg font-semibold">Social Media</span>
        </div>
      </div>
    </div>
  );
}

export default page;
