"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, ArrowRight } from "lucide-react"
import type { OnboardingStep } from "@/app/onboarding/page"

interface WelcomeScreenProps {
  onNext: (step: OnboardingStep) => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Building2 className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Bem-vindo ao Sistema!</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Vamos configurar sua experiência. Escolha como você gostaria de começar:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card
          className="cursor-pointer hover:bg-accent/10 transition-colors group"
          onClick={() => onNext("create-org")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Criar Nova Organização</CardTitle>
            <CardDescription>Crie sua própria organização e convide membros para participar</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="w-full group-hover:bg-primary/90 transition-colors">
              Começar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:bg-accent/10 transition-colors group"
          onClick={() => onNext("join-guest")}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Entrar como Membro</CardTitle>
            <CardDescription>Você foi convidado para participar de uma organização existente</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" className="w-full group-hover:bg-accent transition-colors">
              Continuar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
