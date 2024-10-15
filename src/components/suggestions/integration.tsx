import React from "react";
import { Button } from "../ui/button";
import { ChartNoAxesColumn, ChartNoAxesCombined } from "lucide-react";
import { Input } from "../ui/input";

function Integration() {
  return (
    <>
      <div className="flex justify-between items-center my-5">
        <h2 className="text-xl font-bold">Integrations</h2>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] border"
          />
        </div>
      </div>
      <div className="flex-1 flex gap-8 ">
        <div className="flex flex-col gap-2">
          <div className=" flex gap-4 justify-center flex-col items-center border rounded-lg h-48 w-48">
            <ChartNoAxesCombined size={100} />
            <span className="font-semibold text-lg">Goole Analitics</span>
          </div>
          <Button className="dark:bg-yellow-200   font-semibold">
            Connect
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" flex gap-4 justify-center flex-col items-center border rounded-lg h-48 w-48">
            <ChartNoAxesCombined size={100} />
            <span className="font-semibold text-lg">Goole Analitics</span>
          </div>
          <Button className=" bg-gray-400 text-black hover:bg-gray-400    font-semibold">
            Connected
          </Button>
        </div>
      </div>
    </>
  );
}

export default Integration;
