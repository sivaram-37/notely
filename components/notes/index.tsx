"use client";

import { useNotesStore } from "@/stores/use-notes-store";
import PageHeader from "../common/page-header";
import { useCallback, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import NoteCard from "./note-card";
import EmptyNote from "./empty-note";
import NoSearchResults from "./no-search-results";

const Notes = () => {
  const notes = useNotesStore((s) => s.notes);
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

  const handleOnClearSearch = useCallback(() => {
    setSearchText("");
    setSearchOpen(false);
  }, [setSearchText]);

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
        <NoSearchResults searchText={searchText} onClearSearch={handleOnClearSearch} />
      ) : (
        <div className="p-4 mt-2 h-[calc(100vh-150px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} searchText={searchText} />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
