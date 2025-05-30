"use server"

import { prisma } from "@/packages/db/prisma"

export const getOrganizationsByUserId = async (userId: string) => {
    
try {
    const res = await prisma.organization.findMany({
        where: {
            ownerId: userId
        }
    })
    return res
} catch (error) {
    console.log(error)
}
}



import { auth } from "@/packages/auth/src/auth"
import { headers } from "next/headers"
import type { OrganizationData, InviteMember } from "@/app/onboarding/page"

export async function createOrganizationWithInvites(organizationData: OrganizationData, inviteMembers: InviteMember[]) {
  try {
    // Verificar se o usuário está autenticado
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      throw new Error("Usuário não autenticado")
    }

    // Verificar se o slug já existe
    const existingOrg = await prisma.organization.findUnique({
      where: { slug: organizationData.slug },
    })

    if (existingOrg) {
      throw new Error("Este identificador (slug) já está em uso")
    }

    // Criar a organização e adicionar o owner como membro em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // 1. Criar a organização
      const organization = await tx.organization.create({
        data: {
          name: organizationData.name,
          slug: organizationData.slug,
          description: organizationData.description || null,
          website: organizationData.website || null,
          address: organizationData.address || null,
          city: organizationData.city || null,
          state: organizationData.state || null,
          country: organizationData.country || null,
          zipCode: organizationData.zipCode || null,
          ownerId: session.user.id,
        },
      })

      // 2. Adicionar o owner como membro da organização
      await tx.organizationMember.create({
        data: {
          userId: session.user.id,
          organizationId: organization.id,
          role: "OWNER",
          status: "ACTIVE",
          joinedAt: new Date(),
        },
      })

      // 3. Criar convites para os membros (se houver)
      if (inviteMembers.length > 0) {
        const inviteData = inviteMembers.map((member) => ({
          email: member.email,
          role: member.role as "ADMIN" | "MANAGER" | "EMPLOYEE",
          organizationId: organization.id,
          invitedBy: session.user.id,
          token: generateInviteToken(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        }))

        await tx.organizationInvite.createMany({
          data: inviteData,
        })

        // TODO: Enviar emails de convite
        // await sendInviteEmails(inviteData, organization)
      }

      return organization
    })

    return { success: true, organization: result }
  } catch (error) {
    console.error("Erro ao criar organização:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro interno do servidor",
    }
  }
}

export async function sendOrganizationInvites(organizationId: string, inviteMembers: InviteMember[]) {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      throw new Error("Usuário não autenticado")
    }

    // Verificar se o usuário tem permissão para convidar (owner ou admin)
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
        organizationId: organizationId,
        role: { in: ["OWNER", "ADMIN"] },
        status: "ACTIVE",
      },
    })

    if (!membership) {
      throw new Error("Você não tem permissão para convidar membros")
    }

    // Verificar se a organização existe
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    })

    if (!organization) {
      throw new Error("Organização não encontrada")
    }

    // Criar os convites
    const inviteData = inviteMembers.map((member) => ({
      email: member.email,
      role: member.role as "ADMIN" | "MANAGER" | "EMPLOYEE",
      organizationId: organizationId,
      invitedBy: session.user.id,
      token: generateInviteToken(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
    }))

    const invites = await prisma.organizationInvite.createMany({
      data: inviteData,
    })

    // TODO: Enviar emails de convite
    // await sendInviteEmails(inviteData, organization)

    return { success: true, invites }
  } catch (error) {
    console.error("Erro ao enviar convites:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro interno do servidor",
    }
  }
}

function generateInviteToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Função para buscar organizações do usuário
export async function getUserOrganizations() {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      return { success: false, error: "Usuário não autenticado" }
    }

    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          {
            members: {
              some: {
                userId: session.user.id,
                status: "ACTIVE",
              },
            },
          },
        ],
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            clients: true,
          },
        },
      },
    })

    return { success: true, organizations }
  } catch (error) {
    console.error("Erro ao buscar organizações:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro interno do servidor",
    }
  }
}
