"use client"
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Image from "next/image";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
function page() {
  const [activeTab, setActiveTab] = useState("open");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const products = [
    {
      id: 1,
      name: "Laser Lemonade Machine",
      status: "Draft",
      price: "$499.99",
      sales: 25,
      createdAt: "2023-07-12 10:42 AM",
      images: [
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
      ],
    },
    {
      id: 2,
      name: "Hypernova Headphones",
      status: "Active",
      price: "$129.99",
      sales: 100,
      createdAt: "2023-10-18 03:21 PM",
      images: [
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
        "/camera.jpg",
      ],
    },
  ];
  return (
    <div className="flex flex-col px-4 h-full my-5">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Help Center</h2>
        <div className="flex items-center">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-2/3"
          >
            <div className="w-full">
              <TabsList className="w-full flex gap-4">
                <TabsTrigger value="open" className="flex-1">
                  Open Tickets
                </TabsTrigger>
                <TabsTrigger value="closed" className="flex-1">
                  Closed Tickets
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] border"
            />
          </div>
        </div>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <TableHead>Image</TableHead>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell">Total Sales</TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <Sheet key={product.id}>
              <SheetTrigger asChild>
                <TableRow
                //   onClick={() => {
                //     setSelectedProduct(product);
                //     setMainImage(product.images[0]); // Set first image as default
                //   }}
                  className="cursor-pointer"
                >
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images[0]}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.price}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.sales}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.createdAt}
                  </TableCell>
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-lg">
                {/* <nav className="grid gap-6 text-lg font-medium">
                  <h2 className="text-lg font-bold">{selectedProduct?.name}</h2>
                  {mainImage && (
                    <Image
                      alt="Main product image"
                      src={mainImage}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover mb-4"
                    />
                  )}

                  <div className="flex gap-2 overflow-x-auto hide-scrollbar ">
                    {selectedProduct?.images.map(
                      (imageSrc: string, index: number) => (
                        <Image
                          key={index}
                          alt={`Product image ${index}`}
                          src={imageSrc}
                          width={100}
                          height={100}
                          className="cursor-pointer object-cover rounded-md"
                          onClick={() => handleImageSelect(imageSrc)}
                        />
                      )
                    )}
                  </div>

                  <p>Status: {selectedProduct?.status}</p>
                  <p>Price: {selectedProduct?.price}</p>
                  <p>Sales: {selectedProduct?.sales}</p>
                  <p>Created at: {selectedProduct?.createdAt}</p>
                </nav> */}
              </SheetContent>
            </Sheet>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}

export default page;
