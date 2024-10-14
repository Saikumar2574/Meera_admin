import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Insights from "./Insights";
import Repository from "./Repository";
import Actions from "./Actions";

// import { Charts } from "@/components/charts-01";

interface ContentProps {
  selectedItem: string;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};
const Content: React.FC<ContentProps> = ({ selectedItem }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "Insights":
        return <Insights />;
      case "Repository":
        return <Repository />;
      case "Actions":
        return <div>Action Component</div>;
      case "Suggestions":
        return <div>Suggestions Component</div>; // Replace with actual component
      case "Journey Tracking":
        return <div>Journey Tracking Component</div>; // Replace with actual component
      case "Tickets":
        return <div>Tickets Component</div>; // Replace with actual component
      default:
        return <Insights />;
    }
  };
  return renderContent();
};

export default Content;
