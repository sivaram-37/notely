"use client";

import { Plus } from "lucide-react";
import CardWrapper from "../common/cardWrapper";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { useNotesStore } from "@/stores/useNotesStore";
import { column, NoteTable } from "./note-table";

const AllNotes = () => {
  const notes = useNotesStore((s) => s.notes);

  const handleAddNote = () => {
    redirect("/notes/add-note");
  };

  return (
    <CardWrapper
      outerClassName="w-full border border-primary"
      className=""
      title="Notes"
      customBtn={
        <Button size={"icon-sm"} onClick={handleAddNote}>
          <Plus />
        </Button>
      }>
      <div className="container mx-auto">
        <NoteTable columns={column} data={notes} />
      </div>
    </CardWrapper>
  );
};

export default AllNotes;
