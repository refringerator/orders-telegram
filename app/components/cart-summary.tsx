"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { useToast } from "@/components/toast-provider";
import { saveOrderToSheet } from "@/actions/sheet-actions";

export default function CartSummary({ categories }: { categories: any[] }) {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  //const { toasts, dismiss } = useToast();
  const { showToast } = useToast();

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      showToast("Пожалуйста, введите ваше имя для завершения заказа");
    }

    setIsCheckingOut(true);
    try {
      // Create form data to pass to server action
      const formData = new FormData();
      formData.append(
        "orderData",
        JSON.stringify({
          customerName,
          items,
          // Add any other data you need
        })
      );

      await saveOrderToSheet(formData);

      showToast("Заказ размещен!");
      clearCart();
      setCustomerName("");
    } catch (error) {
      showToast(
        "Произошла ошибка при размещении заказа. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="sticky top-4">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ваш заказ</h2>
          <span className="bg-primary text-primary-foreground text-sm font-medium rounded-full px-2.5 py-0.5">
            {totalItems} шт.
          </span>
        </div>

        {items.length > 0 ? (
          <>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-primary text-sm">
                      {item.price.toFixed(2)} руб.
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-6">
              <div className="flex justify-between font-medium">
                <span>Всего</span>
                <span>{subtotal.toFixed(2)} руб.</span>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Ваше имя"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Обработка..." : "Подтвердить заказ"}
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Очистить корзину
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">Ваша корзина пуста</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Добавьте товары в корзину, чтобы продолжить
            </p>

            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Открыть меню</Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="h-[80vh] sm:max-w-md sm:h-full"
              >
                <SheetHeader>
                  <SheetTitle>Категории</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {categories.map((category) => (
                    <SheetClose asChild key={category.id}>
                      <Button
                        variant="outline"
                        className="justify-start h-12"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          // This would ideally update the URL to filter by category
                        }}
                      >
                        {category.name}
                      </Button>
                    </SheetClose>
                  ))}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Закрыть</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet> */}
          </div>
        )}
      </div>
    </div>
  );
}
