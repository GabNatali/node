import { email } from './../../../../../node_modules/zod/src/v4/core/regexes';
import { z } from "zod";

export const LoginDto = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});
export type LoginDto = z.infer<typeof LoginDto>;