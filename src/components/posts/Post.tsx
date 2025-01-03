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
import ReactionButton from "./ReactionButton";
import PostMoreButton from "./PostMoreButton";
import { useAuthStore } from "@/stores";

import loginImage from "@/assets/login-image.jpg"
import { Card } from "../ui/card";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

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
            <ReactionButton
              postId={post.id}
              initialState={{
                reaction: post._count.reaction,
                userReactionType: post.reaction.find((reaction) => reaction.authorId === user.id)?.type || null,
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

        <Dialog>
          <DialogTrigger asChild >
            <Image
              src={media.url || loginImage}
              alt={media.id || ''}
              sizes="100vw"
              className={"mx-auto size-fit max-h-96 rounded-2xl"}
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={100}
            />
          </DialogTrigger>
          <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
            <DialogTitle>
              <div className="h-[calc(100vh-220px)] overflow-clip rounded-md bg-transparent shadow-md">
                <DialogClose></DialogClose>
                <Image src={media.url || loginImage} fill alt={media.id || ''} className="h-full w-full object-contain" />
              </div>
            </DialogTitle>
          </DialogContent>
        </Dialog>
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
