import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Followers from "./Followers";

export const metadata: Metadata = {
  title: "Followers",
};

export default function Page() {
  return (
    <>
      <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <h1 className="text-center text-2xl font-bold">Followers</h1>
          </div>
          <Followers />
        </div>
      </main>
      <TrendsSidebar />
    </>
  );
}
