"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { Send } from "lucide-react";
function Suggestions({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the active tab based on the pathname
  const segments = pathname.split("/");
  const activeTab = segments.length > 3 ? segments[3] : "";

  const handleTabChange = (value: string) => {
    // if (value === "conversation") {
    //   router.push("/store/suggestions"); // Navigate to All Products
    // } else {
    router.push(`/store/suggestions/${value}`); // Navigate to the selected tab
    // }
  };
  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Suggestions</h2>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-2/3"
        >
          <div className="w-full">
            <TabsList className="w-full flex gap-4">
              <TabsTrigger value="conversation" className="flex-1">
                Conversations
              </TabsTrigger>
              <TabsTrigger value="integration" className="flex-1">
                Integrations
              </TabsTrigger>
              <TabsTrigger value="actions" className="flex-1">
                Actions List
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}

export default Suggestions;
