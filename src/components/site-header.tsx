"use client"

import Link from "next/link";
import { Icons } from "./ui/icons";
import { ThemeToggle } from "./theme-toggle";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

function SiteHeader() {

    return (
        <header className="bg-background sticky top-0 z-20 w-full border-b">
            <div className="w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-8">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <Icons.logo className="h-6 w-6" />
                        <span className="inline-block font-bold">{"Social-Network"}</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <Link href="/logout" className="flex items-center space-x-2">
                                <LogOut className="h-6 w-6" />
                            </Link>
                        </Button>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default SiteHeader;