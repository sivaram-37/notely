"use client";

import { useNotesStore } from "@/stores/use-notes-store";
import { ArrowLeft, Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNotesHydrated } from "@/hooks/use-notes-hydrated";
import RichTextViewer from "../common/rich-text-viewer";
import NoteNotFound from "./note-not-found";

const ViewNote = () => {
  const { note: noteId } = useParams<{ note: string }>();

  const hydrated = useNotesHydrated();
  const noteData = useNotesStore((s) => s.getNoteById(noteId));

  if (!hydrated) return null;

  if (!noteData) {
    return <NoteNotFound />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mt-2 mb-4 flex items-center justify-between">
        <Link
          href={"/notes"}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Button className="inline-flex items-center gap-2 px-4 py-2 active:scale-[0.98] transition-all">
          <Edit />
          Edit
        </Button>
      </div>

      <div className={cn("flex-1 flex flex-col rounded-md border shadow-sm", noteData.cardColor)}>
        {/* Title */}
        <h1 className="px-3 pt-3 text-2xl font-semibold leading-tight wrap-break-word">
          {noteData.title}
        </h1>

        {/* Content */}
        <RichTextViewer value={noteData.contentHtml} />
      </div>
    </div>
  );
};

export default ViewNote;
