'use client'

import Link from "next/link";
import { Icons } from "./ui/icons";
import { ThemeToggle } from "./theme-toggle";

function SiteHeaderAuth() {
    return (
        <header className="bg-background sticky top-0 z-40 w-full border-b">
            <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-8">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <Icons.logo className="h-6 w-6" />
                        <span className="inline-block font-bold">{"Social-Network"}</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default SiteHeaderAuth;