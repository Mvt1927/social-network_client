"use client";

import SiteHeaderAuth from "@/components/site-header-auth";
import Image from "next/image";
import notFound404 from "@/assets/not-found-404.svg";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function NotFound() {
  return (
    <>
      <SiteHeaderAuth />
      <section className="bg-background flex-1 flex">
        <div className="container flex-1 px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <p className="text-sm font-medium text-primary">404 ERROR</p>
            <h1 className="mt-3 text-2xl font-semibold md:text-3xl text-foreground">Page not found</h1>
            <p className="mt-4 text-muted-foreground">Sorry, the page you are looking for doesn&apos;t exist.</p>

            <div className="flex items-center mt-6 gap-x-3">
              <Button variant={"outline"} onClick={useRouter().back}>
                <MoveLeft />
                Go back
              </Button>

              <Button asChild>
                <Link href="/">
                  Take me home
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <Image className="w-full max-w-lg lg:mx-auto" src={notFound404} alt="Not-Found-404" priority />
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;