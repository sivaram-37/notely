import { z } from "zod";

export const addNoteSchema = z.object({
  id: z.string(),
  createdOnDate: z.string(),
  lastModifiedOnDate: z.string(),
  title: z.string(),
  content: z.string(),
});

export type AddNoteForm = z.infer<typeof addNoteSchema>;
