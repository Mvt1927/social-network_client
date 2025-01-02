import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Notifications from "./Notifications";
import MenuBar from "@/components/MenuBar";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function Page() {
  return (
    <>
      <MenuBar className="sticky hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
      <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <h1 className="text-center text-2xl font-bold">Notifications</h1>
          </div>
          <Notifications />
        </div>
      </main>
      <TrendsSidebar />
    </>
  );
}
