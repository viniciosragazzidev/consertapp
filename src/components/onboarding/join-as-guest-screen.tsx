"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Construction } from "lucide-react"
import type { OnboardingStep } from "@/app/onboarding/page"

interface JoinAsGuestScreenProps {
  onBack: (step: OnboardingStep) => void
}

export function JoinAsGuestScreen({ onBack }: JoinAsGuestScreenProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Entrar como Membro</h1>
        <p className="text-muted-foreground">Funcionalidade em desenvolvimento</p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <Construction className="w-10 h-10 text-muted-foreground" />
          </div>
          <CardTitle>Em Breve</CardTitle>
          <CardDescription>Esta funcionalidade está sendo desenvolvida e estará disponível em breve.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Aqui você poderá:</p>
          <ul className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
            <li>• Aceitar convites de organizações</li>
            <li>• Inserir códigos de convite</li>
            <li>• Visualizar organizações disponíveis</li>
            <li>• Solicitar acesso a organizações</li>
          </ul>

          <div className="pt-6">
            <Button variant="outline" onClick={() => onBack("welcome")}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
