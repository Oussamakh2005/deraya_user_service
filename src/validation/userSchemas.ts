import { z } from "zod";

export const userSchema = z.object({
    email: z.email({ message: "Invalid email address" }),

    // Accepts digits and optional leading +, length between 7 and 15 digits
    phone: z
        .string()
        .trim()
        .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, {
            message: "Invalid Algerian phone number",
        }),
    // Minimum 8 chars and at least one letter + one digit (adjust as needed)
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/(?=.*[A-Za-z])(?=.*\d).*/, {
            message: "Password must contain at least one letter and one number",
        }),

    full_name: z
        .string()
        .trim()
        .min(1, { message: "Full name is required" })
        .max(100, { message: "Full name is too long" }),
});
//login 
export const userLoginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/(?=.*[A-Za-z])(?=.*\d).*/, {
            message: "Password must contain at least one letter and one number",
        }),
})

// Typescript type you can reuse
export type UserInput = z.infer<typeof userSchema>;
