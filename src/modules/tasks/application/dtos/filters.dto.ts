import { z } from "zod";

const fromBool = z.preprocess((v) => {
    if (v === undefined || v === null || v === "") return undefined;
    const x = Array.isArray(v) ? v[0] : v;
    if (typeof x === "boolean") return x;
    if (typeof x === "string") {
      const s = x.trim().toLowerCase();
      if (["true", "1"].includes(s)) return true;
      if (["false", "0"].includes(s)) return false;
    }
    return x;
  }, z.boolean().optional());

export const TaskSchemaFilters = z.object({
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  completed: fromBool,
});

export type TaskListFilters = z.infer<typeof TaskSchemaFilters>;