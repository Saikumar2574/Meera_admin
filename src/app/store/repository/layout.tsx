"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the active tab based on the pathname
  const segments = pathname.split("/");
  const activeTab = segments.length > 3 ? segments[3] : "all"; // Defaults to 'all' if not found

  const handleTabChange = (value: string) => {
    if (value === "all") {
      router.push("/store/repository"); // Navigate to All Products
    } else {
      router.push(`/store/repository/${value}`); // Navigate to the selected tab
    }
  };

  return (
    <div className="flex w-full flex-col ">
      {/* {segments.length > 4 ? (
        <main className="flex-1 h-full items-start gap-4  md:gap-8 ">
          {children}
        </main>
      ) : ( */}
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 h-14 gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
          <div className="flex justify-between items-center my-5">
            <h2 className="text-2xl font-bold">Knowledge Base</h2>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] border"
              />
            </div>
          </div>
          <Tabs
            value={activeTab}
            defaultValue="all"
            onValueChange={handleTabChange}
          >
            <div className="w-full mb-3">
              <TabsList className="w-full flex gap-4">
                <TabsTrigger value="all" className="flex-1">
                  All Products
                </TabsTrigger>
                <TabsTrigger value="catalog_structure" className="flex-1">
                  Catalog Structure
                </TabsTrigger>
                <TabsTrigger value="collections" className="flex-1">
                  Collections
                </TabsTrigger>
                <TabsTrigger value="curated" className="hidden sm:flex flex-1">
                  Curated Lists
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </header>

        <main className="flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8">
          <Tabs value={activeTab}>
            <TabsContent value={activeTab}>{children}</TabsContent>
          </Tabs>
        </main>
      </div>
      {/* )} */}
    </div>
  );
}

export default Layout;
