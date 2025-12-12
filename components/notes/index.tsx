"use client";

import { useNotesStore } from "@/stores/use-notes-store";
import PageHeader from "../common/page-header";
import { useState } from "react";
import { redirect } from "next/navigation";
import NoteCard from "./note-card";
import EmptyNote from "./empty-note";

const Notes = () => {
  // Getting notes from store
  const notes = useNotesStore((s) => s.notes);

  const [searchText, setSearchText] = useState("");

  const handleAddNote = () => {
    redirect("/notes/add-notes");
  };

  console.log("searchText", searchText);

  return (
    <>
      <PageHeader
        searchbarPlaceholder="Search Notes..."
        setSearchText={setSearchText}
        addBtnOnClick={handleAddNote}
      />

      {notes.length === 0 ? (
        <EmptyNote handleAddNote={handleAddNote} />
      ) : (
        <div className="p-4 mt-2 h-[calc(100vh-150px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto overflow-x-hidden">
          {notes.map((note, ind) => (
            <NoteCard key={note.id} note={note} index={ind} />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
