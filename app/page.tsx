import { Suspense } from "react";
import CategoriesList from "@/components/categories-list";
import ProductGrid from "@/components/product-grid";
import CartSummary from "@/components/cart-summary";
import { CartProvider } from "@/components/cart-provider";

export default function Home() {
  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order System</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <Suspense fallback={<div>Loading categories...</div>}>
              <CategoriesList />
            </Suspense>

            <Suspense
              fallback={<div className="mt-8">Loading products...</div>}
            >
              <ProductGrid />
            </Suspense>
          </div>

          <div className="lg:col-span-3">
            <CartSummary />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
