"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock categories data
// const categories = [
//   { id: "all", name: "All Products" },
//   { id: "food", name: "Food" },
//   { id: "drinks", name: "Drinks" },
//   { id: "desserts", name: "Desserts" },
//   { id: "snacks", name: "Snacks" },
// ];

export default function CategoriesList({ categories }: { categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const allCategories = [
    { id: "all", name: "Все продукты" },
    ...(categories || []),
  ];

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setActiveCategory(category);
  }, [searchParams]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Категории</h2>
      <Tabs
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {allCategories.map((category: any) => (
            <TabsTrigger key={category.id} value={category.id} className="px-4">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
