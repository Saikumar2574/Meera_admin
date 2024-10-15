"use client";
import React, { useEffect, useState } from "react";
import TeamSwitcher from "./team-switcher";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./ScreenMode";
import { LogOut } from "lucide-react";

interface SidebarProps {
  onSelect: (item: string) => void;
}

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const mainItems = [
    { label: "Insights", path: "/store/insights" },
    { label: "Knowledge Base", path: "/store/repository" },
    { label: "Meera Settings", path: "/store/meera-settings"},
    { label: "Suggestions", path: "/store/suggestions" },
    { label: "Journey Tracking", path: "/store/journey" },
    { label: "Support Tickets", path: "/store/support" },
  ];

  const secondaryItems = [
    { label: "Theme Settings", path: "Theme Settings" },
    { label: "Personalization", path: "Personalization" },
    { label: "Configuration", path: "Configuration" },
    { label: "Ai Showcase", path: "Configuration" },
  ];
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
    <div className=" w-96 p-4 flex flex-col fixed top-0 left-0 h-screen gap-4 ">
      <div className=" border flex items-center justify-between rounded-lg px-4 py-[14px] h-16 bg-white dark:bg-black">
        <img
          src={isDarkMode ? "/FA_dark.png" : "/FA_light.png"}
          className="w-auto h-6"
          alt="Themed Logo"
        />
        <ModeToggle />
      </div>

      <div className="flex-grow px-4 py-2 border rounded-lg bg-white dark:bg-black">
        <h2 className="text-lg font-bold mt-4 mb-3 tracking-wide">
          Meera Inteligence
        </h2>
        <ul>
          {mainItems.map((item) => (
            <li
              key={item.path}
              className={`flex justify-between items-center cursor-pointer    dark:hover:bg-[#ffffff3f] rounded-lg px-4 py-3 font-medium text-base  tracking-wide
                   ${
                     pathname.includes(item.path)
                       ? "text-white  bg-black dark:bg-[#87878750]"
                       : "text-gray-800 dark:text-gray-400 hover:bg-[#f3f3f3]"
                   }`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
              <span className="bg-black text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                !{" "}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg  font-bold mt-10 mb-3 tracking-wide">
          Meera Studio
        </h2>
        <ul>
          {secondaryItems.map((item) => (
            <li
              key={item.path}
              className={`flex justify-between items-center cursor-pointer  dark:text-gray-400  dark:hover:bg-[#ffffff3f] rounded-lg px-4 py-3 font-medium text-base  tracking-wide
                 ${
                   pathname.includes(item.path)
                     ? "text-white  bg-black dark:bg-[#87878750]"
                     : "text-gray-800 hover:bg-[#f3f3f3]"
                 }`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center px-4 py-2 border rounded-lg h-16 bg-white dark:bg-black">
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

export default Sidebar;
