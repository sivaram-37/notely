"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="min-h-[calc(100vh-86px)] bg-white">
      <div className="mx-auto max-w-4xl h-full flex flex-col items-center py-6 px-4 text-center">
        {/* 404 */}
        <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-bold text-foreground">404</h1>

        {/* Image */}
        <div
          className="w-full flex-1 min-h-60 max-h-105 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        />

        {/* Content */}
        <div className="space-y-2 mt-2">
          <h2 className="text-lg sm:text-2xl font-semibold">Look like you&apos;re lost</h2>

          <p className="text-sm sm:text-base text-muted-foreground">
            The page you are looking for is not available!
          </p>

          <Button asChild className="px-6">
            <Link href="/dashboard">Go to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
