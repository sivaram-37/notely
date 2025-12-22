"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Notebook } from "lucide-react";
import Link from "next/link";

const NoteNotFound = () => {
  return (
    <section className="min-h-[calc(100vh-86px)] bg-white">
      <div className="mx-auto max-w-4xl h-full flex flex-col items-center py-6 px-4 text-center">
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
          <h2 className="text-lg sm:text-2xl font-semibold">Note not found</h2>

          <p className="text-sm sm:text-base text-muted-foreground">
            This note may have been deleted, or the link you followed is invalid.
          </p>

          <div className="mt-5 space-x-3">
            <Button asChild variant="secondary">
              <Link href="/notes">
                <ArrowLeft className="mr-1" size={16} />
                Back to notes
              </Link>
            </Button>

            <Button asChild>
              <Link href="/notes/add-notes">
                <Plus /> Add Note <Notebook />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoteNotFound;
