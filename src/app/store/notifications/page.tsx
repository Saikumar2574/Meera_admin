import React from "react";

function page() {
  return (
    <div className="flex flex-col px-4 h-full my-5">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <div className="flex mt-5 gap-8 overflow-hidden">
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="flex flex-col gap-6">
            <div className="border rounded-lg h-32 w-full"></div>
            <div className="border rounded-lg h-32 w-full"></div>
          </div>

          <div className="flex flex-col gap-6 mt-5">
            <h5 className="font-semibold">Yesturday</h5>
            <div className="border rounded-lg h-32 w-full"></div>
            <div className="border rounded-lg h-32 w-full"></div>
            <div className="border rounded-lg h-32 w-full"></div>
          </div>

          <div className="flex flex-col gap-6 mt-5">
            <h5 className="font-semibold">Last Week</h5>
            <div className="border rounded-lg h-32 w-full"></div>
            <div className="border rounded-lg h-32 w-full"></div>
            <div className="border rounded-lg h-32 w-full"></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex-1 border rounded-lg">
            <h5 className="font-semibold p-4">Preview</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
