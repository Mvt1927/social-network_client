import { createUploadthing, FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({
    image: { maxFileSize: "512KB" },
  }).onUploadComplete(async ({ file }) => {
    const newAvatarUrl = file.url.replace(
      "/f/",
      `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
    );

    return { avatarUrl: newAvatarUrl };
  }),
  attachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    
    return {
      url: file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      ),
      type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
    };
  }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
