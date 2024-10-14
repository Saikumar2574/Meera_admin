// ../../data/schema.ts

import { z } from "zod";

// Define the Zod schema
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["todo", "in progress", "backlog"]),
  label: z.string(),
  priority: z.enum(["low", "medium", "high"]),
});

// Export the Task type based on the schema
export type Task = z.infer<typeof taskSchema>;
