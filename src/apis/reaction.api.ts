import { ReactionInfo } from "@/lib/types";
import { AXIOS } from "./axiosClients";
import { Reaction, ReactionType } from "@prisma/client";

const subdirectory = "/reaction";

export const getReactions = async (postId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.get<ReactionInfo>(
        `post/${postId}${subdirectory}`,
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

export const createReaction = async (
  postId: string,
  access_token: string,
  data: {
    type: ReactionType;
  },
) => {
  try {
    return {
      response: await AXIOS.post<Reaction>(
        `post/${postId}${subdirectory}`,
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

export const deleteReaction = async (
  postId: string,
  access_token: string,
) => {
  try {
    return {
      response: await AXIOS.delete<ReactionInfo>(
        `post/${postId}${subdirectory}`,
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
}