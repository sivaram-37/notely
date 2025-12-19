"use client";

import { Button } from "@/components/ui/button";
import { FileX, ArrowLeft, Plus, Notebook } from "lucide-react";
import { useRouter } from "next/navigation";

const NoteNotFound = () => {
  const router = useRouter();

  const handleBackToNotes = () => router.push("/notes");

  const handleAddNote = () => router.push("/notes/add-notes");

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-3 text-muted-foreground">
        <FileX size={56} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold">Note not found</h2>

      {/* Description */}
      <p className="mt-2 text-muted-foreground max-w-sm">
        This note may have been deleted, or the link you followed is invalid.
      </p>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <Button variant="outline" onClick={handleBackToNotes}>
          <ArrowLeft className="mr-1" size={16} />
          Back to notes
        </Button>

        <Button onClick={handleAddNote}>
          <Plus /> Add Note <Notebook />
        </Button>
      </div>
    </div>
  );
};

export default NoteNotFound;
