import { z } from "zod";
import { mediaSchema } from "./media.dto";

export const createPostSchema = z.object({
  content: z.string().optional(),
  attachments: z.array(mediaSchema).optional(),
}).refine(
  data => !data.content && !data.attachments,
  {
    message: "Content is required",
    path: ["content"],
  }
)