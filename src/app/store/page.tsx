"use client";
import React, { useState } from "react";
import Content from "@/components/Content";

const Home: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Home");

  return <Content selectedItem={selectedItem} />;
};

export default Home;
