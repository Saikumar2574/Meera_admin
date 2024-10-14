"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { File, ListFilter, MoreHorizontal, RefreshCcw } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

function ProductsListing() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

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

  const handleImageSelect = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardDescription>Manage all your products.</CardDescription>
        </CardHeader>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 gap-2 mr-5 text-base font-bold bg-black text-white dark:bg-white dark:text-black"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <TableHead>Image</TableHead>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
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
                    onClick={() => {
                      setSelectedProduct(product);
                      setMainImage(product.images[0]); // Set first image as default
                    }}
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
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
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
                  <nav className="grid gap-6 text-lg font-medium">
                    <h2 className="text-lg font-bold">
                      {selectedProduct?.name}
                    </h2>
                    {/* Main Image */}
                    {mainImage && (
                      <Image
                        alt="Main product image"
                        src={mainImage}
                        width={400}
                        height={400}
                        className="w-full h-auto object-cover mb-4"
                      />
                    )}

                    {/* Image Carousel */}
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
                  </nav>
                </SheetContent>
              </Sheet>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductsListing;
