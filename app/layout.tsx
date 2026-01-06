import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Notely",
  description: "A Web application to save Notes, To-do and Meetings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased bg-rose-50/60 min-h-dvh flex flex-col border-b-4 border-primary"}>
        <Navbar />
        <main className="p-3 flex-1 overflow-hidden">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
