"use client";

import { useParams, useSearchParams } from "next/navigation";
import ViewNote from "./view-note";
import AddNote from "./add-notes";
import { useNotesStore } from "@/stores/use-notes-store";
import { useNotesHydrated } from "@/hooks/use-notes-hydrated";
import NoteNotFound from "./note-not-found";

const ViewEditPage = () => {
  const { note: noteId } = useParams<{ note: string }>();
  const searchParams = useSearchParams();

  const isEdit = searchParams.get("edit") === "true";
  const hydrated = useNotesHydrated();
  const noteData = useNotesStore((s) => s.getNoteById(noteId));

  if (!hydrated) return null;

  if (!noteData) {
    return <NoteNotFound />;
  }

  return isEdit ? <AddNote isEdit={true} noteData={noteData} /> : <ViewNote noteData={noteData} />;
};

export default ViewEditPage;
