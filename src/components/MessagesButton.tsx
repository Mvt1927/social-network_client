"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";


export default function FollowersButton() {

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Followers"
      asChild
    >
      <Link href="/follower">
        <div className="relative">
          <User />
        </div>
        <span className="hidden lg:inline">Followers</span>
      </Link>
    </Button>
  );
}
