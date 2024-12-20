import { $Enums } from "@prisma/client";
import { z } from "zod";

export const mediaSchema = z.object({
  url: z.string().url(),
  type: z.nativeEnum($Enums.MediaType),
})