import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
//   .regex(/[A-Z]/, "Must include an uppercase letter")
//   .regex(/[a-z]/, "Must include a lowercase letter")
//   .regex(/\d/, "Must include a number")
//   .regex(/[^A-Za-z0-9]/, "Must include a special character");


// LOGIN
export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

// SIGNUP
export const SignupSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required").email("Enter a valid email"),
        password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Inferred types
export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
