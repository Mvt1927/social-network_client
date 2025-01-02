"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import LoadingButton from "@/components/LoadingButton"
import { useTransition } from "react"
import { useAuthStore } from "@/stores"
import { toast } from "@/hooks/use-toast"
import { requestVerifyFormSchema } from "@/dtos"
import { redirect } from "next/navigation"

export function RequestVerifyForm() {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof requestVerifyFormSchema>>({
    resolver: zodResolver(requestVerifyFormSchema),
    defaultValues: {
      email: "",
    }
  })

  const authStore = useAuthStore();

  function handleSubmit(data: z.infer<typeof requestVerifyFormSchema>) {
    startTransition(async () => {
      const { error } = await authStore.fetchRequestVerify(data);

      if (error) {
        if (typeof error.message === "string") {
          form.setError("email", {
            type: "manual",
            message: error.message,
          });
          toast({
            variant: "destructive",
            description: error.message,
          })
        } else {
          form.setError("email", {
            type: "manual",
            message: "Something went wrong",
          });
          redirect("/login")
        }
      }else{
        redirect("/verify-email");
      }
    });
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <Card className="mx-auto min-w-80 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Request verify</CardTitle>
            <CardDescription>
              Enter your Email to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    <div className="text-sm">
                      Email
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" autoFocus required />
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="grid gap-4">
            <LoadingButton loading={isPending} type="submit" className="w-full">
              Send Request
            </LoadingButton>
            <div className="text-center text-sm">
              You have an code?{" "}
              <Link href="/verify-email" className="underline">
                Verify now
              </Link>
            </div>
          </CardFooter>
        </Card >
      </form>
    </Form>
  )
}
