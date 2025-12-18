import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Note = {
  id: string;
  title: string;
  contentHtml?: string;
  contentText?: string;
  modifiedOn: string;
  cardColor: string;
};

type NotesStore = {
  notes: Note[];
  addNote: (note: Note) => void;
};

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),
    }),
    {
      name: "notely-notes-storage",
    }
  )
);
