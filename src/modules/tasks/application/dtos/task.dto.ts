import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().trim().min(3, "titulo required")
            .max(100, "the title cannot have more than 100 characters")
            .transform(val => val.replace(/\s+/g, " ")),
    description: z.string().trim()
            .max(500, "The description cannot have more than 500 characters")
            .transform(val => val.replace(/\s+/g, " ")),
})

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;


export const UpdateTaskSchema = z.object({
        title: z.string()
          .trim()
          .min(3, "El título debe tener al menos 3 caracteres")
          .max(100, "El título no puede tener más de 100 caracteres")
          .transform(val => val.replace(/\s+/g, " "))
          .optional(),
      
        description: z.string()
          .trim()
          .max(500, "La descripción no puede tener más de 500 caracteres")
          .transform(val => val.replace(/\s+/g, " "))
          .optional(),

        isCompleted: z.string().transform((val) => val.toLowerCase() === "true").optional()
      })
      .refine(
        (data) => data.title !== undefined || data.description !== undefined || data.isCompleted !== undefined,
        { message: "You must submit at least one field to update" }
      );
      
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;

export const TaskIdSchema = z.object({
  idTask: z.string().uuid("Invalid UUID format"),
});

export type TaskIdParams = z.infer<typeof TaskIdSchema>;