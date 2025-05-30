"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, UserPlus, Mail, Trash2, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { OnboardingStep, OrganizationData, InviteMember } from "@/app/onboarding/page"
import { createOrganizationWithInvites } from "@/actions/organization"

interface InviteMembersScreenProps {
  onBack: (step: OnboardingStep) => void
  organizationData: OrganizationData
  inviteMembers: InviteMember[]
  setInviteMembers: (members: InviteMember[]) => void
}

const roles = [
  { value: "ADMIN", label: "Administrador" },
  { value: "MANAGER", label: "Gerente" },
  { value: "EMPLOYEE", label: "Funcionário" },
]

export function InviteMembersScreen({
  onBack,
  organizationData,
  inviteMembers,
  setInviteMembers,
}: InviteMembersScreenProps) {
  const [email, setEmail] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const addMember = () => {
    if (email && selectedRole) {
      // Verificar se o email já foi adicionado
      if (inviteMembers.some((member) => member.email === email)) {
        toast.error("Este email já foi adicionado")
        return
      }

      const newMember: InviteMember = {
        id: Date.now().toString(),
        email,
        role: selectedRole,
      }
      setInviteMembers([...inviteMembers, newMember])
      setEmail("")
      setSelectedRole("")
      toast.success("Membro adicionado à lista")
    }
  }

  const removeMember = (id: string) => {
    setInviteMembers(inviteMembers.filter((member) => member.id !== id))
    toast.success("Membro removido da lista")
  }

  const handleFinish = async () => {
    setIsLoading(true)

    try {
      const result = await createOrganizationWithInvites(organizationData, inviteMembers)

      if (result.success) {
        toast.success("Organização criada com sucesso!")
        if (inviteMembers.length > 0) {
          toast.success(`${inviteMembers.length} convite(s) enviado(s)`)
        }
        router.push("/")
      } else {
        toast.error(result.error || "Erro ao criar organização")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Erro inesperado ao criar organização")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleLabel = (roleValue: string) => {
    return roles.find((role) => role.value === roleValue)?.label || roleValue
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addMember()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Convidar Membros</h1>
        <p className="text-muted-foreground">Convide pessoas para participar da sua organização</p>
      </div>

      <div className="space-y-6">
        {/* Add Member Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Adicionar Membro
            </CardTitle>
            <CardDescription>Digite o email e selecione o cargo do novo membro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="usuario@exemplo.com"
                />
              </div>
              <div className="w-48 space-y-2">
                <Label>Cargo</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={addMember} disabled={!email || !selectedRole} className="h-10">
                  Adicionar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Membros a Convidar ({inviteMembers.length})
            </CardTitle>
            <CardDescription>Lista de pessoas que receberão convites por email</CardDescription>
          </CardHeader>
          <CardContent>
            {inviteMembers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum membro adicionado ainda</p>
                <p className="text-sm">Você pode pular esta etapa e convidar membros depois</p>
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left p-3 font-medium">Email</th>
                      <th className="text-left p-3 font-medium">Cargo</th>
                      <th className="p-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inviteMembers.map((member) => (
                      <tr key={member.id} className="border-t">
                        <td className="p-3">{member.email}</td>
                        <td className="p-3">
                          <Badge variant="outline">{getRoleLabel(member.role)}</Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMember(member.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => onBack("create-org")} disabled={isLoading}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Button>
          <Button onClick={handleFinish} disabled={isLoading}>
            {isLoading ? "Criando organização..." : "Finalizar Configuração"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
