import { z } from "zod";

export const addNoteSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Title is required!").max(50, "Title is too long!"),
  contentHtml: z.string().optional(),
  contentText: z.string().optional(),
  modifiedOn: z.string(),
  cardColor: z.string(),
});

export type AddNoteFormType = z.infer<typeof addNoteSchema>;
