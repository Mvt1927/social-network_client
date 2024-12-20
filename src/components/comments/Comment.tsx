import { CommentData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import CommentMoreButton from "./CommentMoreButton";
import { useAuthStore } from "@/stores";
import { MediaPreviews } from "../posts/Post";

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useAuthStore();

  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment.author}>
          <Link href={`/users/${comment.author.username}`}>
            <UserAvatar avatarUrl={comment.author.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.author}>
            <Link
              href={`/users/${comment.author.username}`}
              className="font-medium hover:underline"
            >
              {comment.author.fullname}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatRelativeDate(comment.createAt)}
          </span>
        </div>
        <div>{comment.message.content}</div>
        {!!comment.message.attachments.length && (
          <MediaPreviews attachments={comment.message.attachments} />
        )}
      </div>
      {comment.author.id === user.id && (
        <CommentMoreButton
          comment={comment}
          className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
        />
      )}
    </div>
  );
}
