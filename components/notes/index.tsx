"use client";

import { useNotesStore } from "@/stores/use-notes-store";
import PageHeader from "../common/page-header";
import { useMemo, useState } from "react";
import { redirect } from "next/navigation";
import NoteCard from "./note-card";
import EmptyNote from "./empty-note";
import NoSearchResults from "../common/no-search-results";
import { toast } from "sonner";

const Notes = () => {
  const notes = useNotesStore((s) => s.notes);
  const deleteNote = useNotesStore((s) => s.deleteNote);
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleAddNote = () => {
    redirect("/notes/add-notes");
  };

  const filteredNotes = useMemo(() => {
    if (!searchText?.trim()) return notes;
    const q = searchText?.toLowerCase();
    return notes?.filter(
      (note) => note.title?.toLowerCase().includes(q) || note.contentText?.toLowerCase().includes(q)
    );
  }, [notes, searchText]);

  const handleOnClearSearch = () => {
    setSearchText("");
    setSearchOpen(false);
  };

  const handleCardClick = (id: string) => {
    redirect(`/notes/${id}`);
  };

  const handleEditNote = (id: string) => {
    redirect(`/notes/${id}?edit=true`);
  };

  const handleDeleteNote = (id: string) => {
    toast("Delete this note?", {
      description: "You won’t be able to recover it later.",
      duration: Infinity,
      action: {
        label: "Delete",
        onClick: () => {
          deleteNote(id);
          toast.success("Note deleted", { duration: 1000 });
        },
      },
      actionButtonStyle: { backgroundColor: "rgb(239 68 68)" },
      cancel: { label: "Cancel", onClick: () => toast.dismiss() },
      cancelButtonStyle: { border: "1px solid #333" },
    });
  };

  return (
    <>
      <PageHeader
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchbarPlaceholder="Search Notes..."
        searchText={searchText}
        setSearchText={setSearchText}
        addBtnOnClick={handleAddNote}
      />

      {notes.length === 0 ? (
        <EmptyNote handleAddNote={handleAddNote} />
      ) : filteredNotes.length === 0 ? (
        <NoSearchResults
          title="notes"
          searchText={searchText}
          onClearSearch={handleOnClearSearch}
        />
      ) : (
        <div className="p-4 mt-2 h-[calc(100vh-150px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start overflow-y-auto">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              searchText={searchText}
              handleCardClick={() => handleCardClick(note.id)}
              handleEditNote={() => handleEditNote(note.id)}
              handleDeleteNote={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
