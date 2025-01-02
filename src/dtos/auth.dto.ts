import { User } from "@/dtos";

export interface AuthData {
  user: User;
  token: string;
  refreshToken: string;
}

import { z } from "zod";
export const USERNAME_REGEX = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(8, "Username must be at least 8 characters")
    .regex(
      USERNAME_REGEX,
      "Username should have only letters, numbers, dots or underscores",
    ),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      PASSWORD_REGEX,
      "Password should have minimum 8 characters, at least one uppercase letter and a number or special character",
    ),
});

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .toLowerCase()
      .email("Invalid email address"),
    username: z
      .string()
      .nonempty("Username is required")
      .min(8, "Username must be at least 8 characters")
      .toLowerCase()
      .regex(
        USERNAME_REGEX,
        "Username should have only letters, numbers, dots or underscores",
      ),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        PASSWORD_REGEX,
        "Password should have minimum 8 characters, at least one uppercase letter and a number or special character",
      ),

    confirmPassword: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        PASSWORD_REGEX,
        "Password should have minimum 8 characters, at least one uppercase letter and a number or special character",
      )
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const otpFormSchema = z.object({
  code: z.string().min(6).nonempty("Code is required"),
});

export const requestVerifyFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});