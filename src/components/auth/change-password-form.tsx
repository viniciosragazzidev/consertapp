"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { changePasswordAction } from "@/actions/change-password.action"
import { Loader2 } from "lucide-react"

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const formData = new FormData(evt.target as HTMLFormElement)

    setIsPending(true)

    const { error } = await changePasswordAction(formData)

    if (error) {
      toast.error(error)
    } else {
      toast.success("Password changed successfully")
      ;(evt.target as HTMLFormElement).reset()
    }

    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          type="password"
          id="currentPassword"
          name="currentPassword"
          placeholder="Enter current password"
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter new password"
          className="bg-background"
        />
      </div>

      <Button type="submit" disabled={isPending} variant="outline" className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Change Password
      </Button>
    </form>
  )
}
