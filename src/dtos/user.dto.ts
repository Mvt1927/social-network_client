import { z } from "zod";

export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  avatarUrl: string;
  bio: string;
  isVerified: boolean;
  roles: string[];
  createAt: string;
  updateAt: string;
}

export const updateUserProfileSchema = z.object({
  fullname: z.string().trim().min(1, "Required").optional(),
  bio: z.string().max(1000, "Must be at most 1000 characters").optional(),
  avatarUrl: z.string().url().optional(),
}).refine(
  (data) => data.fullname || data.bio || data.avatarUrl,
  {
    message: "You must provide at least one field to update your profile.",
  }
);

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
