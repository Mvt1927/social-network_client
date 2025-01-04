'use client'
import { z } from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { requestPasswordChange } from '@/apis'

export const passwordChangeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>

export default function PasswordChangeRequest() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const form = useForm<PasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: PasswordChangeSchema) => {
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      await requestPasswordChange(data.email)

      console.log('Password change requested for:', data.email)
      setSuccess(true)
    } catch (err: unknown) {
      console.log('Error requesting password change:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto h-fit">
      <CardHeader>
        <CardTitle>Request Password Change</CardTitle>
        <CardDescription>Enter your email to request a password change.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 size={20} />
                <span>Password reset link sent to your email.</span>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading || success}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isLoading ? 'Sending...' : 'Request Password Change'}
        </Button>
      </CardFooter>
    </Card>
  )
}

