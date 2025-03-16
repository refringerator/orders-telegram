"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export default function ProductGrid({ products }: { products: any[] }) {
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
              {product.price.toFixed(2)} руб.
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button onClick={() => addToCart(product)} className="w-full">
              Добавить в корзину
            </Button>
          </CardFooter>
        </Card>
      ))}

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">
            Нет продуктов в этой категории.
          </p>
        </div>
      )}
    </div>
  );
}
