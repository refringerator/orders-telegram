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
import { toast } from "@/hooks/use-toast";

export default function CartSummary() {
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

  const handleCheckout = () => {
    if (!customerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to complete the order",
        variant: "destructive",
      });
      return;
    }

    // Simulate order processing
    setIsCheckingOut(true);
    setTimeout(() => {
      toast({
        title: "Order placed!",
        description: `Thank you ${customerName}, your order has been received.`,
      });
      clearCart();
      setCustomerName("");
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="sticky top-4">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <span className="bg-primary text-primary-foreground text-sm font-medium rounded-full px-2.5 py-0.5">
            {totalItems} {totalItems === 1 ? "item" : "items"}
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
                      ${item.price.toFixed(2)}
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Complete Order"}
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Order
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">Your order is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Add some items to get started
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Browse Menu</Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="h-[80vh] sm:max-w-md sm:h-full"
              >
                <SheetHeader>
                  <SheetTitle>Menu Categories</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {["Food", "Drinks", "Desserts", "Snacks"].map((category) => (
                    <SheetClose asChild key={category}>
                      <Button
                        variant="outline"
                        className="justify-start h-12"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          // This would ideally update the URL to filter by category
                        }}
                      >
                        {category}
                      </Button>
                    </SheetClose>
                  ))}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  );
}
