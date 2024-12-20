"use client";

import { PostData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Media } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import Comments from "../comments/Comments";
import Linkify from "../Linkify";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";
import PostMoreButton from "./PostMoreButton";
import { useAuthStore } from "@/stores";

import loginImage from "@/assets/login-image.jpg"
import { Card } from "../ui/card";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useAuthStore();

  const [showComments, setShowComments] = useState(false);

  return (
    <Card>

      <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <UserTooltip user={post.author}>
              <Link href={`/users/${post.author.username}`}>
                <UserAvatar avatarUrl={post.author.avatarUrl} />
              </Link>
            </UserTooltip>
            <div>
              <UserTooltip user={post.author}>
                <Link
                  href={`/users/${post.author.username}`}
                  className="block font-medium hover:underline"
                >
                  {post.author.fullname}
                </Link>
              </UserTooltip>
              <Link
                href={`/posts/${post.id}`}
                className="block text-sm text-muted-foreground hover:underline"
                suppressHydrationWarning
              >
                {formatRelativeDate(post.createAt)}
              </Link>
            </div>
          </div>
          {post.author.id === user.id && (
            <PostMoreButton
              post={post}
              className="opacity-0 transition-opacity group-hover/post:opacity-100"
            />
          )}
        </div>
        <Linkify>
          <div className="whitespace-pre-line break-words">{post.message.content}</div>
        </Linkify>
        {!!post.message.attachments.length && (
          <MediaPreviews attachments={post.message.attachments} />
        )}
        <hr className="text-muted-foreground" />
        <div className="flex justify-between gap-5">
          <div className="flex items-center gap-5">
            <LikeButton
              postId={post.id}
              initialState={{
                reactions: post._count.reaction,
                isreactedByUser: post.reaction.some((reaction) => reaction.authorId === user.id),
              }}
            />
            <CommentButton
              post={post}
              onClick={() => setShowComments(!showComments)}
            />
          </div>
          <BookmarkButton
            postId={post.id}
            initialState={{
              isBookmarkedByUser: post.bookmarks.some(
                (bookmark) => bookmark.userId === user.id,
              ),
            }}
          />
        </div>
        {showComments && <Comments post={post} />}
      </article>
    </Card>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

export function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Image
          src={media.url || loginImage}
          alt="Attachment"
          width={500}
          height={500}
          className="mx-auto size-fit max-h-96 rounded-2xl"
        />
      </Suspense>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url || undefined}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}
