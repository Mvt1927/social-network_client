import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";

const getTrendingTopics = () => {

  const rows = () => {
    // const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    //         SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    //         FROM posts
    //         GROUP BY (hashtag)
    //         ORDER BY count DESC, hashtag ASC
    //         LIMIT 5
    //     `;
    const rows = [
      { hashtag: '#javascript', count: 150 }, // Dùng 'n' để biểu thị bigint
      { hashtag: '#reactjs', count: 120 },
      { hashtag: '#nodejs', count: 100 },
      { hashtag: '#webdev', count: 80 },
    ]
    return rows.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  }

  return rows();
}

export function TrendingTopics() {
  const trendingTopics = getTrendingTopics();

  return (
    <Card>
      <CardHeader className="font-bold">Trending topics</CardHeader>
      <CardContent className="space-y-2">
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];
        return (
          <Link key={title} href={`/hashtag/${title}`} className={`block group`}>
            <p
              className="line-clamp-1 break-all font-semibold group-hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
      </CardContent>
    </Card>
  );
}
