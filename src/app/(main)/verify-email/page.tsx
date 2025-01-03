import VerifyEmail from "./VerifyEmail";
import VerifyEmailWithToken from "./VerifyEmailWithToken";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export const generateMetadata = () => {
  return {
    title: `Verify Email`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (token) {
    return (
      <VerifyEmailWithToken token={token} />
    );
  }
  return (
    <VerifyEmail />
  );
}
