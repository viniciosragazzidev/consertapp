"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react"
import { useState } from "react"
import type { OnboardingStep, OrganizationData } from "@/app/onboarding/page"

interface CreateOrganizationScreenProps {
  onNext: (step: OnboardingStep) => void
  onBack: (step: OnboardingStep) => void
  organizationData: OrganizationData
  setOrganizationData: (data: OrganizationData) => void
}

export function CreateOrganizationScreen({
  onNext,
  onBack,
  organizationData,
  setOrganizationData,
}: CreateOrganizationScreenProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof OrganizationData, value: string) => {
    setOrganizationData({
      ...organizationData,
      [field]: value,
    })

    // Auto-generate slug from name
    if (field === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setOrganizationData({
        ...organizationData,
        [field]: value,
        slug: slug,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onNext("invite-members")
  }

  const isFormValid = organizationData.name && organizationData.slug

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Organização *</Label>
                <Input
                  id="name"
                  value={organizationData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Minha Empresa LTDA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Identificador (Slug) *</Label>
                <Input
                  id="slug"
                  value={organizationData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="minha-empresa"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={organizationData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
                placeholder="Descreva sua organização..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={organizationData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://www.exemplo.com"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Endereço</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={organizationData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Rua, número, complemento"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={organizationData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={organizationData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="SP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={organizationData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={organizationData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Brasil"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={() => onBack("welcome")}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Voltar
              </Button>
              <Button type="submit" disabled={!isFormValid || isLoading}>
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
