import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email().min(5, { message: "Email cannot be empty" }),
  password: z
    .string()
    .min(6, { message: "Password can not be less than 6 characters" }),
});

export const SignUpSchema = z.object({
  email: z.string().email().min(5, { message: "Email cannot be empty" }),
  password: z
    .string()
    .min(6, { message: "Password can not be less than 6 characters" }),
  firstname: z
    .string()
    .min(6, { message: "First name can not be less than 5 characters" }),
  lastname: z
    .string()
    .min(6, { message: "Last name can not be less than 5 characters" }),
});
