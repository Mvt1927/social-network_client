"use client";
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { registerFormSchema } from "@/dtos"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import LoadingButton from "./LoadingButton"

export function SignupForm() {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: ""
    }
  })

  const authStore = useAuthStore();

  function handleSubmit(data: z.infer<typeof registerFormSchema>) {
    startTransition(async () => {
      const { error } = await authStore.fetchLogin(data);

      if (error) {
        if (typeof error.message === "string") {
          form.setError("username", {
            type: "manual",
            message: error.message,
          });
        } else {
          error.message.forEach((error) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form.setError(error.property as any, {
              type: "manual",
              message: Object.values(error.constraints).join(", "),
            });
          })
        }
      }
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your email below to register new account
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
                    <Input {...field} type="email" placeholder="m@example.com" autoFocus required />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
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
                    <Input {...field} type="text" placeholder="Username" required />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    <div className="text-sm">
                      Password
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" required />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    <div className="text-sm">
                      Confirm Password
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" required />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="grid gap-4">
            <LoadingButton loading={isPending} type="submit" className="w-full mt-4">
              Register
            </LoadingButton>
            <div className="text-center text-sm">
              Did you already have an account?{" "}
              <Link href="/login" className="underline">
                Login now
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
