import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Мои заказы",
  description: "Telegram orders store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
