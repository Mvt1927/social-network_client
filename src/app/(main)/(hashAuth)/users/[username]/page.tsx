import { Metadata } from "next";
import UserPage from "./UserPage";
import TrendsSidebar from "@/components/TrendsSidebar";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const { username } = await params;

  return {
    title: `@${username}`,
  };
}

export default async function Page({ params }: PageProps) {

  const { username } = await params;
  
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserPage username={username} />
      </div>
      <TrendsSidebar />
    </main>
  );
}


