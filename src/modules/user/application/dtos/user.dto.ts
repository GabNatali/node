import { z } from "zod";

export const zEmail = z.string().trim().email("invalid email");

export const CreateUserSchema = z.object({
    email: zEmail,
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UserResponseSchema = z.object({
    id: z.string().uuid("ID inválido"),
    email: zEmail,
});
export type UserResponseDto = z.infer<typeof UserResponseSchema>;
