import { verifyWithToken } from "@/apis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function VerifyEmailWithToken(
  { token }: {
    token: string
  }
) {
  try {
    await verifyWithToken(token)
    return (
      <div className="w-full self-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Email</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CardDescription>
              Your email has been verified
            </CardDescription>
          </CardContent>
          <CardFooter className="grid gap-4">
            <Button type="submit" asChild className="w-full mt-4">
              <Link href="/login" className="underline">
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  } catch (error: unknown) {
    console.log(error)
    return (
      <div className="w-full self-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Email</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CardDescription className="text-destructive">
              Your token is invalid
            </CardDescription>
          </CardContent>
          <CardFooter className="grid gap-4">
            <Button type="submit" asChild className="w-full mt-4">
              <Link href="/login" className="underline">
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
}
