"use client";
import Link from "next/link"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTransition } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import LoadingButton from "./LoadingButton"
import { otpFormSchema } from "@/dtos";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export function OTPForm() {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      code: "",
    }
  })

  const authStore = useAuthStore();

  function handleSubmit(data: z.infer<typeof otpFormSchema>) {
    startTransition(async () => {
      const { error } = await authStore.fetchVerify(data);

      if (error) {
        if (typeof error.message === "string") {
          form.setError("code", {
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
      } else {
        toast({
          variant: "default",
          description: "Email verified",})
        redirect("/home");
      }
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Email</CardTitle>
            <CardDescription>
              Enter your code to verify your email
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    <div className="text-sm">
                      Code
                    </div>
                  </FormLabel>
                  <FormControl>
                    <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            
          </CardContent>
          <CardFooter className="grid gap-4">
            <LoadingButton loading={isPending} type="submit" className="w-full mt-4">
              Verify
            </LoadingButton>
            <div className="text-center text-sm">
              Don&apos;t have an code?{" "}
              <Link href="/request-verify" className="underline">
                request a new one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
