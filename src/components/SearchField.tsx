"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

export default function SearchField() {
  const router = useRouter();

  const [input, setInput] = useState("");

  useCopilotReadable({
    description: "The search field.",
    value: input,
  });

  useCopilotAction({
    name: "search",
    description: "Search for something like post, user, hastag. with post you need postId, with user you need username, with hastag you need add # before hastag",
    parameters: [
      {
        name: "query",
        type: "string",
        description: "The search query.",
        required: true,
        value: input,
      },
    ],
    handler: ({ query }) => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input value={input} onChange={(e) => setInput(e.target.value)} name="q" placeholder="Search" className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}
