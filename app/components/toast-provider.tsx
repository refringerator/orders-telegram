// components/ToastProvider.tsx
"use client";

import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState } from "react";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider>
        <Toast.Root
          className="fixed bottom-5 right-5 bg-gray-800 text-white p-3 rounded shadow-lg"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title>{message}</Toast.Title>
          <Toast.Close className="absolute top-1 right-2 text-gray-400 hover:text-white">
            ×
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-5 right-5 w-64" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
