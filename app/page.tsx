import { Suspense } from "react";
import CategoriesList from "@/components/categories-list";
import ProductGrid from "@/components/product-grid";
import CartSummary from "@/components/cart-summary";
import { CartProvider } from "@/components/cart-provider";
import { ToastProvider } from "@/components/toast-provider";
import { getAllPrices } from "./lib/dbhelpers";

export default async function Home() {
  const products = await getAllPrices();

  const categories = Array.from(
    new Set(products.map((product: any) => product.category))
  ).map((category) => ({ id: category, name: category }));

  return (
    <ToastProvider>
      <CartProvider>
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-8">Order System</h1> */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9">
              <Suspense fallback={<div>Загрузка категорий...</div>}>
                <CategoriesList categories={categories} />
              </Suspense>

              <Suspense
                fallback={<div className="mt-8">Загрузка товаров...</div>}
              >
                <ProductGrid products={products} />
              </Suspense>
            </div>

            <div className="lg:col-span-3">
              <CartSummary />
            </div>
          </div>
        </div>
      </CartProvider>
    </ToastProvider>
  );
}
