import { User } from "@/components/TrendsSidebar";
import { UserData } from "@/lib/types";

type Props = {
  follower: UserData
}
export const Follower = ({ follower }: Props) => {
  return (
    <User key={follower.id} user={follower} />
  );
}