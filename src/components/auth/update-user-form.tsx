"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { updateUser } from "@/packages/auth/src/auth-client"
import { Loader2 } from "lucide-react"

interface UpdateUserFormProps {
  name: string
  image: string
}

export const UpdateUserForm = ({ name, image }: UpdateUserFormProps) => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const formData = new FormData(evt.target as HTMLFormElement)
    const name = String(formData.get("name"))
    const image = String(formData.get("image"))

    if (!name && !image) {
      return toast.error("Please enter a name or image")
    }

    await updateUser({
      ...(name && { name }),
      image,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true)
        },
        onResponse: () => {
          setIsPending(false)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onSuccess: () => {
          toast.success("User updated successfully")
          ;(evt.target as HTMLFormElement).reset()
          router.refresh()
        },
      },
    })
  }

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={name} placeholder="Enter your name" className="bg-background" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Perfil Image URL</Label>
        <Input
          id="image"
          name="image"
          defaultValue={image}
          placeholder="https://example.com/image.jpg"
          className="bg-background"
        />
      </div>

      <Button type="submit" disabled={isPending} variant="default" className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Atualizar Perfil
      </Button>
    </form>
  )
}
