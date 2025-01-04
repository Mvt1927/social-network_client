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
import { loginFormSchema } from "@/dtos"
import { toast } from "@/hooks/use-toast"
import { PasswordInput } from "./ui/input-password"
import { redirect } from "next/navigation"

export function LoginForm() {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const authStore = useAuthStore();

  function handleSubmit(data: z.infer<typeof loginFormSchema>) {
    startTransition(async () => {
      const { error } = await authStore.fetchLogin(data);

      if (error) {
        if (typeof error.message === "string") {
          form.setError("username", {
            type: "manual",
            message: error.message,
          });
          toast({
            variant: "destructive",
            description: error.message,
          })
        } else {
          error.message.forEach((error) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form.setError(error.property as any, {
              type: "manual",
              message: Object.values(error.constraints).join(", "),
            });
            toast({
              variant: "destructive",
              description: Object.values(error.constraints).join(", "),
            })
          })
        }


      }
      else {
        redirect("/home");
      }
    });
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <Card className="mx-auto min-w-80 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your Account to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    <div className="text-sm">
                      Username
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" autoFocus required />
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    <div className="flex-1 text-sm">
                      Password
                    </div>
                    <Link href="/forgot-password" className="hover:underline text-sm">Forgot password?</Link></FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Password" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="grid gap-4">
            <LoadingButton loading={isPending} type="submit" className="w-full">
              Login
            </LoadingButton>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card >
      </form>
    </Form>
  )
}
