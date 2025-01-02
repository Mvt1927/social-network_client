import UserAvatar from "@/components/UserAvatar";
import { NotificationData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";

interface NotificationProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `${notification.issuer.fullname} followed you`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `${notification.issuer.fullname} commented on your post`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    REACTION: {
      message: `${notification.issuer.fullname} liked your post`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
    },
    CHAT_SEND_MESSAGE: {
      message: `${notification.issuer.fullname} sent you a message`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/users/${notification.chat?.authorId}/messages?message=${notification.chatId}`,
    },
    COMMENT_REPLY: {
      message: `${notification.issuer.fullname} replied to your comment`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    FRIEND_REQUEST: {
      message: `${notification.issuer.fullname} sent you a friend request`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
    },
    GROUP_CHAT_SEND_MESSAGE: {
      message: `${notification.issuer.fullname} sent a message in the group chat`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/groups/${notification.groupChat?.groupId}/messages?message=${notification.groupChat?.id}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="space-y-3">
          <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
          <div>
            <span className="font-bold">{notification.issuer.fullname}</span>{" "}
            <span>{message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.message.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
