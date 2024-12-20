"use client"

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import { ThemeToggle } from "./theme-toggle";

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
                        <Link
                            href={"https://github.com/Mvt1927"}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.gitHub className="size-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default SiteHeader;