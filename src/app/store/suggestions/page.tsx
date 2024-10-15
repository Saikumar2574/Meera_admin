import { Button } from "@/components/ui/button";
import { Progress } from "antd";
import React from "react";

function page() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-widest">
          Gathering Data <br /> From Integrations
        </h2>
        <Button className="px-16 font-semibold text-lg">Start</Button>
      </div>
      <Progress
        strokeColor="green"
        trailColor="white"
        showInfo={false}
        percent={50}
        strokeLinecap="butt"
        size={["100%", 50]}
      />
      <div className="flex-1 flex flex-col border rounded-lg px-6 py-8 gap-10">
        <div className="flex gap-6">
          <div>
            <div className="h-48 w-48 border rounded-lg"></div>
            <p className="font-semibold text-center mt-1">
              Google
              <br />
              Analitics
            </p>
          </div>
          <div className="flex flex-col  gap-5">
            <p className="font-semibold">Pages Per Session : 3000</p>
            <p className="font-semibold">Average Time On Page : 20000</p>
            <p className="font-semibold">Exit Rate : 10%</p>
            <p className="font-semibold">Social Media Engagement : 5%</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <div className="h-48 w-48 border rounded-lg"></div>
            <p className="font-semibold text-center mt-1">
              Google
              <br />
              Analitics
            </p>
          </div>
          <div className="flex flex-col  gap-5">
            <p className="font-semibold">Pages Per Session : 3000</p>
            <p className="font-semibold">Average Time On Page : 20000</p>
            <p className="font-semibold">Exit Rate : 10%</p>
            <p className="font-semibold">Social Media Engagement : 5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
