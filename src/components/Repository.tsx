"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import ProductsListing from "./repoTabs/products";
import CatalogStructure from "./repoTabs/catalog";
import CuratedList from "./repoTabs/curatedList";
import Collections from "./repoTabs/collections";

export default function Repository() {
  // State to manage selected tab
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 h-14 gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex justify-between items-center my-5">
            <h2 className="text-2xl font-bold">Knowledge Base</h2>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="w-full mb-3">
              <TabsList className="w-full flex gap-4">
                <TabsTrigger value="all" className="flex-1">
                  All Products
                </TabsTrigger>
                <TabsTrigger value="catalog" className="flex-1">
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

        <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs value={activeTab}>
            {/* Content for the "All Products" Tab */}
            <TabsContent value="all">
              <ProductsListing />
            </TabsContent>

            {/* Content for the "Catalog Structure" Tab */}
            <TabsContent value="catalog">
              <CatalogStructure />
            </TabsContent>

            {/* Content for the "Collections" Tab */}
            <TabsContent value="collections">
              <Collections />
            </TabsContent>

            {/* Content for the "Curated Lists" Tab */}
            <TabsContent value="curated">
              <CuratedList />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
