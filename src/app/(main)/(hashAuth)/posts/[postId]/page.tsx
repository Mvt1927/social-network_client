import { Metadata } from "next";
import PostPage from "./PostPage";

interface PageProps {
  params: Promise<{
    postId: string
  }>;
}


export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> =>{
  return {
    title: `Post ${(await params).postId}`,
  };
}

export default async function Page({ params }: PageProps) {

  return (
    <PostPage postId={(await params).postId} />
  );
}

