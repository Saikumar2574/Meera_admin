import Steps from "@/components/steps";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <Steps />
      <div className="bg-white rounded-xl p-4">{children}</div>
    </div>
  );
}

export default layout;
