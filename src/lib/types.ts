import { $Enums, Prisma, ReactionType } from '@prisma/client';
export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    fullname: true,
    avatarUrl: true,
    bio: true,
    createAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
        following: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getPostDataInclude(loggedInUserId: string) {
  return {
    author: {
      select: getUserDataSelect(loggedInUserId),
    },
    message: {
      include: {
        attachments: true,
      }
    },
    reaction: {
      where: {
        authorId: loggedInUserId,
      },
      select: {
        authorId: true,
        type: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        reaction: true,
        comments: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
  omit: Prisma.PostOmit;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    author: {
      select: getUserDataSelect(loggedInUserId),
    },
    message: {
      include: {
        attachments: true,
      },
    }
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export const notificationsInclude = {
  issuer: {
    select: {
      username: true,
      fullname: true,
      avatarUrl: true,
    },
  },
  post: {
    select: {
      message: true,
    },
  },
  chat: {
    select: {
      id: true,
      authorId: true,
    },
  },
  groupChat: {
    select: {
      id: true,
      authorId: true,
      groupId: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  following: number;
  isFollowedByUser: boolean;
}

export interface ReactionInfo {
  reaction: number;
  userReactionType: ReactionType | null;
};

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface MessageCountInfo {
  unreadCount: number;
}

export function convertStringToMediaType(str: string | undefined): $Enums.MediaType {

  if (!str) {
    return $Enums.MediaType.OTHER;
  }

  if (str.startsWith('image')) {
    return $Enums.MediaType.IMAGE;
  }

  if (str.startsWith('video')) {
    return $Enums.MediaType.VIDEO;
  }

  if (str.startsWith('audio')) {
    return $Enums.MediaType.AUDIO;
  }

  return $Enums.MediaType.OTHER;
}
