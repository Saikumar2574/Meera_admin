"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";

const Home: React.FC = () => {
  redirect("/store/insights");
};

export default Home;
