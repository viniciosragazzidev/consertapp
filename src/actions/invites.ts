"use server"

import { auth } from "@/packages/auth/src/auth"
import { prisma } from "@/packages/db/prisma"
import { headers } from "next/headers"

export async function acceptOrganizationInvite(token: string) {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      throw new Error("Usuário não autenticado")
    }

    // Buscar o convite
    const invite = await prisma.organizationInvite.findUnique({
      where: { token },
      include: {
        organization: true,
      },
    })

    if (!invite) {
      throw new Error("Convite não encontrado")
    }

    if (invite.expiresAt < new Date()) {
      throw new Error("Convite expirado")
    }

    if (invite.email !== session.user.email) {
      throw new Error("Este convite não é para o seu email")
    }

    // Verificar se o usuário já é membro
    const existingMember = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: session.user.id,
          organizationId: invite.organizationId,
        },
      },
    })

    if (existingMember) {
      throw new Error("Você já é membro desta organização")
    }

    // Aceitar o convite em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar o membro
      const member = await tx.organizationMember.create({
        data: {
          userId: session.user.id,
          organizationId: invite.organizationId,
          role: invite.role,
          status: "ACTIVE",
          joinedAt: new Date(),
        },
      })

      // Deletar o convite
      await tx.organizationInvite.delete({
        where: { id: invite.id },
      })

      return member
    })

    return { success: true, member: result, organization: invite.organization }
  } catch (error) {
    console.error("Erro ao aceitar convite:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro interno do servidor",
    }
  }
}

export async function getPendingInvites() {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      return { success: false, error: "Usuário não autenticado" }
    }

    const invites = await prisma.organizationInvite.findMany({
      where: {
        email: session.user.email,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            description: true,
            logo: true,
          },
        },
        invitedByUser: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, invites }
  } catch (error) {
    console.error("Erro ao buscar convites:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro interno do servidor",
    }
  }
}
