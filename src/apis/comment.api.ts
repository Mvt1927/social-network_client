import { createCommentSchema } from "@/dtos/comment.dto";
import { CommentData, CommentsPage } from "@/lib/types";
import { z } from "zod";
import { AXIOS } from "./axiosClients";

const subdirectory = "/comment";

export const createComment = async (
  postId: string,
  data: z.infer<typeof createCommentSchema>,
  access_token: string,
) => {
  try {
    return {
      response: await AXIOS.post<CommentData>(
        `/post/${postId}${subdirectory}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getComments = async (
  postId: string,
  access_token: string,
  pageParams: string | null = null,
) => {
  try {
    return {
      response: await AXIOS.get<CommentsPage>(
        `/post/${postId}${subdirectory}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: pageParams
            ? {
                cursor: pageParams,
              }
            : undefined,
        },
      ),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteComment = async (
  postId: string,
  commentId: string,
  access_token: string,
) => {
  try {
    return {
      response: await AXIOS.delete<CommentData>(
        `/post/${postId}${subdirectory}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const updateComment = async (
  postId: string,
  commentId: string,
  data: z.infer<typeof createCommentSchema>,
  access_token: string,
) => {
  try {
    return {
      response: await AXIOS.put<CommentData>(
        `/post/${postId}${subdirectory}/${commentId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    };
  } catch (error: unknown) {
    throw error;
  }
};