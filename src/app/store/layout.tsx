import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen ml-96">
        {/* Add the Navbar at the top */}
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className=" mx-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default layout;
