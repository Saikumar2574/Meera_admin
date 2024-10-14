"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import OnBoardSidebar from "@/components/OnBoardSidebar";
import { BiSupport } from "react-icons/bi";
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <>
      {pathName.includes("/store/new") ? <OnBoardSidebar /> : <Sidebar />}

      <div className="flex flex-col flex-1 h-screen ml-96">
        {/* Add the Navbar at the top */}
        {pathName.includes("/store/new") ? (
          <div className=" sticky top-0  p-4">
            <div className="flex items-center justify-between  px-6 py-2 h-16">
              {/* Left Side: Placeholder Image */}
              <h3 className="font-bold text-xl ">On Boarding</h3>

              {/* Right Side: Help and Notification Icons */}
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <BiSupport className="text-xl cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Navbar />
        )}
        <div className="flex-1 overflow-y-auto">
          <div className=" mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
}

export default layout;
