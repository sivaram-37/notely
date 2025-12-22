import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Note = {
  id: string;
  title: string;
  contentHtml: string;
  contentText: string;
  modifiedOn: string;
  cardColor: string;
};

type NotesStore = {
  notes: Note[];
  addNote: (note: Note) => void;
  getNoteById: (id: string) => Note | undefined;
  updateNote: (note: Note) => void;
};

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),

      getNoteById: (id) => {
        return get().notes.find((n) => n.id === id);
      },

      updateNote: (updatedNote) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
        })),
    }),
    {
      name: "notely-notes-storage",
    }
  )
);
