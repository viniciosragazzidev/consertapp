import { ChangePasswordForm } from "@/components/auth/change-password-form"
import { SignOutButton } from "@/components/auth/signout-button"
import { UpdateUserForm } from "@/components/auth/update-user-form"
import { ReturnButton } from "@/components/return-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/packages/auth/src/auth"
import { LogOut, Shield, User, Lock, ChevronDown, Settings, Crown, FileText } from 'lucide-react'
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session) redirect("/login")

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  })

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center justify-end w-full gap-2">
          {session.user.role === "ADMIN" && (
            <Button size="sm" variant="outline" asChild>
              <Link href="/admin/dashboard">
                <Settings className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          )}
        
        </div>
      </div>

      {/* Perfil Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Perfil</h1>
        <p className="text-sm text-muted-foreground">Gerencie sua conta e suas preferências.</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="profile" className="mb-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          {/* User Info Card */}
      <Card className="mb-6 bg-card/50 pb-10">
        <CardHeader className="bg-muted/30 py-6">
          <CardTitle>Informações do Usuário</CardTitle>
          <CardDescription>Suas informações pessoais e ajustes do perfil.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {session.user.image ? (
                <img
                  src={session.user.image || "/placeholder.svg"}
                  alt="User Image"
                  className="size-24 border rounded-md object-cover"
                />
              ) : (
                <div className="size-24 border rounded-md bg-muted/30 text-primary flex items-center justify-center">
                  <span className="uppercase text-xl font-medium">{session.user.name.slice(0, 2)}</span>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="space-y-1 mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  {session.user.name}
                  {session.user.role === "ADMIN" && <Crown className="size-4 text-primary" />}
                </h2>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-muted/30">
                    {session.user.role}
                  </Badge>
                </div>
              </div>

              {/* Update Form */}
              <UpdateUserForm name={session.user.name} image={session.user.image ?? ""} />
            </div>
          </div>
        </CardContent>
      </Card>
            </TabsContent>

    <TabsContent value="permissions">

      {/* Permissões Card */}
      <Card className="mb-6 bg-card/50 pb-10">
        <CardHeader className="bg-muted/30 py-6">
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            Permissões
          </CardTitle>
          <CardDescription>Your current access permissions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left p-3 font-medium">Permission</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Manage Own Posts
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="bg-muted/30">Enabled</Badge>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Manage All Posts
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className={FULL_POST_ACCESS.success ? "bg-muted/30" : "bg-muted/30"}>
                      {FULL_POST_ACCESS.success ? "Enabled" : "Disabled"}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
</TabsContent>

    <TabsContent value="security">
      {/* Mudar Senha Card */}
      <Card className="mb-6 bg-card/50 pb-10">
        <CardHeader className="bg-muted/30 py-6">
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-4 text-primary" />
            Mudar Senha
          </CardTitle>
          <CardDescription>Altere a senha da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </TabsContent>
      </Tabs>



  
    </div>
  )
}
