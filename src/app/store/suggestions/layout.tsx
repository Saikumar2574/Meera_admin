import Suggestions from "@/components/suggestions/main";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col px-4 h-full my-5">
      <Suggestions children={children} />
    </div>
  );
}

export default layout;
