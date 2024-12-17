import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";

function SiteHeaderLoading() {
  return (
    <header className="bg-background top-0 z-40 w-full border-b">
      <div className="w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-8">
        <div className="flex gap-6 md:gap-10">
          <div className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{"Social-Network"}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Skeleton className="w-10 h-10 " />
            <Skeleton className="w-10 h-10 " />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default SiteHeaderLoading;