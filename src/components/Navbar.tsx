"use client";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import TeamSwitcher from "./team-switcher";
import { ModeToggle } from "./ScreenMode";
import { VscGitCompare } from "react-icons/vsc";
const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className=" sticky top-0  p-4">
      <div className="flex items-center justify-between border rounded-lg px-6 py-2 h-16 bg-white dark:bg-black">
        {/* Left Side: Placeholder Image */}
        <div className="w-36 flex items-center justify-between">
          <img
            src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
            className="w-28  md:h-10"
          />
          <img
            src={isDarkMode ? "/change_dark.png" : "/change_light.png"}
            className="w-auto h-6 cursor-pointer"
            alt="Themed Logo"
          />
        </div>

        {/* Right Side: Help and Notification Icons */}
        <div className="flex items-center space-x-5">
          <div className="relative">
            <FaBell className="text-xl cursor-pointer " />
          </div>
          <div className="relative">
            <BiSupport className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
