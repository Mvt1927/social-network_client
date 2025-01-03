"use client";

import { getUnreadNotificationsCount } from "@/apis";
import { Button } from "@/components/ui/button";
import { NotificationCountInfo } from "@/lib/types";
import { useAuthStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
}

export default function NotificationsButton({
  initialState,
}: NotificationsButtonProps) {


  const { access_token } = useAuthStore();

  const getNotificationsCount = async (
    access_token: string,
  ) => {
    const { response } = await getUnreadNotificationsCount(
      access_token,
    )
    return response.data;
  }

  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () => getNotificationsCount(
      access_token
    ),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Notifications"
      asChild
    >
      <Link href="/notifications">
        <div className="relative">
          <Bell />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Notifications</span>
      </Link>
    </Button>
  );
}
