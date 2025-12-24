import { z } from "zod";

export const addTodoSchema = z.object({
  id: z.string(),
  content: z.string().trim().min(1, "content is required!").max(50, "content is too long!"),
  isCompleted: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().optional(),
});

export type AddTodoFormType = z.infer<typeof addTodoSchema>;
