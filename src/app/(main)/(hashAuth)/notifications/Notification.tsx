import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
    { message: string; icon: JSX.Element; href: string, issuerHref: string }
  > = {
    FOLLOW: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} followed you`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} commented on your post`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
    REACTION: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} liked your post`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
    CHAT_SEND_MESSAGE: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} sent you a message`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/users/${notification.chat?.authorId}/messages?message=${notification.chatId}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
    COMMENT_REPLY: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} replied to your comment`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
    FRIEND_REQUEST: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} sent you a friend request`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
    GROUP_CHAT_SEND_MESSAGE: {
      message: `${notification.issuer.fullname || `@${notification.issuer.username}`} sent a message in the group chat`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/groups/${notification.groupChat?.groupId}/messages?message=${notification.groupChat?.id}`,
      issuerHref: `/users/${notification.issuer.username}`,
    },
  };

  const { message, icon, href, issuerHref } = notificationTypeMap[notification.type];

  return (

    <Link href={href} className="block">
      <Card
        className={cn(
          "flex flex-col rounded-2xl bg-card shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <CardHeader>
          <div className="flex gap-2">
            <div className="my-1">{icon}</div>
            <Button asChild
              variant="ghost"
              className="flex-1 flex items-center justify-start"
            >
              <Link href={issuerHref}>
                <div className="flex gap-2">
                  <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
                  <div>
                    <span className="font-bold">{notification.issuer.fullname || `@${notification.issuer.username}`}</span>{" "}
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <span>{message}</span>
          </div>
        </CardContent>
        <CardFooter>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.message.content}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
