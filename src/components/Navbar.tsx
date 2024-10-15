"use client";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import TeamSwitcher from "./team-switcher";
import { ModeToggle } from "./ScreenMode";
import { VscGitCompare } from "react-icons/vsc";
import {
  ArrowDownNarrowWide,
  EllipsisVertical,
  Menu,
  Split,
} from "lucide-react";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check for dark mode on mount
    updateTheme();

    // Listen for changes to the theme
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect(); // Clean up the observer on component unmount
    };
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between border rounded-lg px-6 py-2 h-16 bg-white dark:bg-black">
        {/* Left Side: Placeholder Image */}
        <div className="w-32 flex items-center justify-between">
          <img
            src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
            className="w-28  md:h-10"
          />
          {/* <img
            src={isDarkMode ? "/change_dark.png" : "/change_light.png"}
            className="w-auto h-6 cursor-pointer"
            alt="Themed Logo"
          /> */}
          <div className="p-2 rounded-full cursor-pointer">
            <ArrowDownNarrowWide size={24} />
          </div>
        </div>

        {/* Right Side: Help and Notification Icons */}
        <div className="flex items-center space-x-2">
          <div
            className={`relative p-2 rounded-lg cursor-pointer hover:bg-[#878787b8] ${
              path === "/store/notifications" && "bg-black text-white dark:bg-[#878787b8]"
            }`}
            onClick={() => router.push("/store/notifications")}
          >
            <FaBell className="text-xl cursor-pointer " />
          </div>
          <div
            className={`relative p-2 rounded-lg cursor-pointer hover:bg-[#878787b8] ${
              path === "/store/help" && "bg-black text-white dark:bg-[#878787b8]"
            }`}
            onClick={() => router.push("/store/help")}
          >
            <BiSupport className="text-xl " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
