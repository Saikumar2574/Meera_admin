"use client";
import React, { useEffect, useState } from "react";
import TeamSwitcher from "./team-switcher";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./ScreenMode";
import { LogOut } from "lucide-react";


const OnBoardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
//   const mainItems = [
//     { label: "Insights", path: "/store/insights" },
//     { label: "Knowledge Base", path: "/store/repository" },
//     { label: "Meera Settings", path: "/store/meera-settings"},
//     { label: "Suggestions", path: "/store/suggestions" },
//     { label: "Journey Tracking", path: "/store/journey-tracking" },
//     { label: "Support Tickets", path: "/store/support" },
//   ];

//   const secondaryItems = [
//     { label: "Theme Settings", path: "Theme Settings" },
//     { label: "Personalization", path: "Personalization" },
//     { label: "Configuration", path: "Configuration" },
//     { label: "Ai Showcase", path: "Configuration" },
//   ];
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
    <div className=" w-96 p-4 flex flex-col fixed top-0 left-0 h-screen bg-white dark:bg-[#191919] ">
      <div className="  flex items-center justify-between  px-4 py-[14px] h-16">
        <img
          src={isDarkMode ? "/FA_dark.png" : "/FA_light.png"}
          className="w-auto h-6"
          alt="Themed Logo"
        />
        <ModeToggle />
      </div>
      <hr className="h-0.5 bg-gray-800 border-0"/>
      <div className="flex-grow px-4 py-2 ">
        <h2 className="text-lg font-bold mt-4 mb-3 tracking-wide">
          Instructions :
        </h2>
      </div>
      <hr className="h-0.5 bg-gray-800 border-0"/>
      <div className="flex items-center justify-center px-4 py-2  h-16">
        <img
          src={isDarkMode ? "/user_dark.png" : "/user_light.png"}// Replace with your image path
          alt="Profile"
          className="w-12 h-12 rounded-full  mr-2"
        />
        <div>
          <p className="font-semibold">Arjun</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
        <div className="ml-auto">
          <LogOut className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default OnBoardSidebar;
