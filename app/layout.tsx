import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/navbar";

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
      <body className={"antialiased bg-rose-50 h-dvh border-b-4 border-primary"}>
        <Navbar />
        <div className="p-3">{children}</div>
      </body>
    </html>
  );
}
