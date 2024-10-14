import Steps from "@/components/steps";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="p-4 overflow-hidden">
      <Steps />
      <div className=" p-4">{children}</div>
    </div>
  );
}

export default layout;
