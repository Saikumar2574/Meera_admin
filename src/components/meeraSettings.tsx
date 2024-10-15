"use client";
import React from "react";
import { Button } from "./ui/button";

function MeeraSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Meera Settings</h2>
      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-6 mt-5">
          <div>
            <p className="font-semibold  mb-4">Name : Meera</p>
            <Button className="px-10">Customize</Button>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Tonality</h5>
            <div className="mb-4 border rounded-lg p-4 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Enthusiasum</p>
                <div className=" flex flex-col relative">
                  <span className="ml-auto text-[8px] font-semibold">
                    Medium
                  </span>
                  <div className="h-3 w-56 bg-gray-200 rounded-3xl"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-5 h-5  bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Diplomacy</p>
                <div className=" flex flex-col relative">
                  <span className="ml-auto text-[8px] font-semibold">
                    Medium
                  </span>
                  <div className="h-3 w-56 bg-gray-200 rounded-3xl"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-5 h-5  bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Persuation</p>
                <div className=" flex flex-col relative">
                  <span className="ml-auto text-[8px] font-semibold">
                    Medium
                  </span>
                  <div className="h-3 w-56 bg-gray-200 rounded-3xl"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-5 h-5  bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Emotion</p>
                <div className=" flex flex-col relative">
                  <span className="ml-auto text-[8px] font-semibold">
                    Medium
                  </span>
                  <div className="h-3 w-56 bg-gray-200 rounded-3xl"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-5 h-5  bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs mb-4">
              The defalut tonality is good for every store.
              <br />
              If you want to customize you can but, every conversation <br />{" "}
              will need to be accomodated.
            </p>
            <Button className="px-10">Save Changes</Button>
          </div>
        </div>

        <div className="flex-1 border rounded-lg"></div>
      </div>
    </div>
  );
}

export default MeeraSettings;
