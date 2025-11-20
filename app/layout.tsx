import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

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
      <body className={`antialiased p-4 bg-primary-foreground h-dvh`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
