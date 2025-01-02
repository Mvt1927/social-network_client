'use client';

import { Button } from "@/components/ui/button";
import { Bookmark, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import MessagesButton from "./MessagesButton";
import NotificationsButton from "./NotificationsButton";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {



  const [unreadNotificationsCount, unreadMessagesCount] = [0, 0]

  return (
    <div className="sticky top-20 hidden h-fit sm:block flex-none space-y-5 2xl:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <Card className={className}>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Home"
            asChild
          >
            <Link href="/">
              <Home />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </Button>
          <NotificationsButton
            initialState={{ unreadCount: unreadNotificationsCount }}
          />
          <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Bookmarks"
            asChild
          >
            <Link href="/bookmarks">
              <Bookmark />
              <span className="hidden lg:inline">Bookmarks</span>
            </Link>
          </Button>
        </Card>
      </Suspense>
    </div>
  );
}
