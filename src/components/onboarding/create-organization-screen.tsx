"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react"
import type { OnboardingStep, OrganizationData } from "@/app/onboarding/page"

interface CreateOrganizationScreenProps {
  onNext: (step: OnboardingStep) => void
  onBack: (step: OnboardingStep) => void
  organizationData: OrganizationData
  setOrganizationData: (data: OrganizationData) => void
}

// 🧪 Schema de validação com zod
const organizationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string(),
  website: z.string().url("URL inválida").optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
})

type OrganizationFormData = z.infer<typeof organizationSchema>

export function CreateOrganizationScreen({
  onNext,
  onBack,
  organizationData,
  setOrganizationData,
}: CreateOrganizationScreenProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    mode: "onChange",
    defaultValues: organizationData,
  })

  // ✨ Auto atualizar o slug com base no nome
  const nameValue = watch("name")
  useEffect(() => {
    const slug = nameValue
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    setValue("slug", slug)
  }, [nameValue, setValue])

  const onSubmit = async (data: OrganizationFormData) => {
    setIsLoading(true)

    // Salva os dados no estado pai
    setOrganizationData(data)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onNext("invite-members")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Criar Organização</h1>
        <p className="text-muted-foreground">Preencha as informações da sua organização</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Organização</CardTitle>
          <CardDescription>Essas informações podem ser alteradas posteriormente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Organização *</Label>
                <Input id="name" {...register("name")} placeholder="Minha Empresa LTDA" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Identificador (Slug) *</Label>
                <Input id="slug" {...register("slug")} placeholder="minha-empresa" />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" {...register("description")} placeholder="Descreva sua organização..." rows={3} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" {...register("website")} placeholder="https://www.exemplo.com" />
              {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Endereço</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" {...register("address")} placeholder="Rua, número, complemento" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...register("city")} placeholder="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" {...register("state")} placeholder="SP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input id="zipCode" {...register("zipCode")} placeholder="00000-000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input id="country" {...register("country")} placeholder="Brasil" />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={() => onBack("welcome")}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar
              </Button>
              <Button type="submit" disabled={!isValid || isLoading}>
                {isLoading ? "Criando..." : "Continuar"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
