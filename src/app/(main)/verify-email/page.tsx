'use client'

import { verifyWithToken } from "@/apis";
import { OTPForm } from "@/components/otp-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores";
import { Link } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const searchParams = useSearchParams()
  const { validateToken } = useAuthStore()

  const token = searchParams.get('token')

  useEffect(() => {
    const verifyToken = async (token: string) => {
      const { error } = await verifyWithToken(token)
      if (!error) {
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
      }
    }
    if (token) {
      verifyToken(token)
    } else
      if (!token) {
        const validate = async () => {
          const isValid = await validateToken()
          if (!isValid) {
            redirect('/login')
          }
        }
        validate()
      }
  }, [token])



  return (
    <div className="w-full self-center">
      <OTPForm />
    </div>
  )
}
