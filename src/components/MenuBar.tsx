'use client';

import { Button } from "@/components/ui/button";
import { Bookmark, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import FollowersButton from "./FollowersButton";
import NotificationsButton from "./NotificationsButton";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { usePathname, useRouter } from "next/navigation";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {

  const router = useRouter()
  const pathName = usePathname()
  const [unreadNotificationsCount] = [0]

  const menubarHref = {
    home: "/home",
    bookmarks: "/bookmarks",
    notifications: "/notifications",
    follower: "/follower",
  }

  useCopilotReadable({
    description: "Đây là thông tin về các đường dẫn trong menubar.",
    value: menubarHref,
  })

  useCopilotReadable({
    description: "Đây là thông tin đường dẫn hiện tại",
    value: pathName,
  })

  useCopilotAction({
    name: "navigationAction",
    description: "",
    parameters: [
      {
        name: "page",
        type: "string",
        description: `
        The page you want to navigate to. 
        It can be home, bookmarks, notifications, followers,etc. 
        With home, you will be redirected to /home, 
        with bookmarks, you will be redirected to /bookmarks, 
        with notifications, you will be redirected to /notifications, 
        with followers, you will be redirected to /follower
        With username you need username of user, you will be redirected to /users/{username}
        With post you need postId of post, you will be redirected to /posts/{postId}
        `,

        required: true,
      },
    ],
    handler: ({ page }) => {
      router.push(page)
    }
  })

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
            <Link href="/home">
              <Home />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </Button>
          <NotificationsButton
            initialState={{ unreadCount: unreadNotificationsCount }}
          />
          <FollowersButton />
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
