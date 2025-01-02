"use client";

import { Button } from "@/components/ui/button";
import { MessageCountInfo } from "@/lib/types";
import { useAuthStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import Link from "next/link";

interface MessagesButtonProps {
  initialState: MessageCountInfo;
}

export default function MessagesButton({ initialState }: MessagesButtonProps) {

  const { access_token } = useAuthStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUnreadMessagesCount = async (access_token: string) => {
    return {
      unreadCount: 10,
    };
  }

  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: async () => {

      return getUnreadMessagesCount(access_token)
    },
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Messages"
      asChild
    >
      <Link href="/messages">
        <div className="relative">
          <Mail />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Messages</span>
      </Link>
    </Button>
  );
}
