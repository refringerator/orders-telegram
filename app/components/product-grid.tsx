"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

// Mock products data
const products = [
  {
    id: 1,
    name: "Burger",
    price: 8.99,
    category: "food",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Pizza",
    price: 12.99,
    category: "food",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Salad",
    price: 7.99,
    category: "food",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Soda",
    price: 2.49,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Coffee",
    price: 3.99,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Juice",
    price: 3.49,
    category: "drinks",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Cake",
    price: 5.99,
    category: "desserts",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Ice Cream",
    price: 4.99,
    category: "desserts",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    name: "Chips",
    price: 2.99,
    category: "snacks",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Popcorn",
    price: 3.49,
    category: "snacks",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const categoryFilter = searchParams.get("category");

  const filteredProducts =
    categoryFilter && categoryFilter !== "all"
      ? products.filter((product) => product.category === categoryFilter)
      : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-primary font-medium">
              ${product.price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button onClick={() => addToCart(product)} className="w-full">
              Add to Order
            </Button>
          </CardFooter>
        </Card>
      ))}

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
