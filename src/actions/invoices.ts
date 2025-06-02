'use server'
import { Invoice } from "@/lib/@types/schema.types";
import { prisma } from "@/packages/db/prisma"
    import {cache } from "react";


export const getOrganizationInvoices = cache(async (organizationId: string) => {
    try {
        const res = await prisma.invoice.findMany({
                where: {
                    organizationId

                }
        })
        const invoices = res as Invoice[]
        return invoices
} catch (error) {
        console.log(error)
}
})



export const getOrganizationInvoiceById = cache(async (organizationId: string, id: string) => {
    try {
        const res = await prisma.invoice.findUnique({
                where: {
                    id
                }
        })
        const invoice = res as Invoice
        return invoice
} catch (error) {
        console.log(error)
}
})


export const createOrganizationInvoice = cache(async (organizationId: string, data: Invoice) => {
    try {
        const res = await prisma.invoice.create({
                data: {
                    organizationId,
                    ...data
                }
        })
        const invoice = res as Invoice
        return invoice
} catch (error) {
        console.log(error)
}
})  

export const updateOrganizationInvoice = cache(async (organizationId: string, id: string, data: Invoice) => {
    try {
        const res = await prisma.invoice.update({
                where: {
                    id
                },
                data: {
                    organizationId,
                    ...data
                }
        })
        const invoice = res as Invoice
        return invoice
} catch (error) {
        console.log(error)
}
})


export const deleteOrganizationInvoice = cache(async (organizationId: string, id: string) => {
    try {
        const res = await prisma.invoice.delete({
                where: {
                    id
                }
        })
        const invoice = res as Invoice
        return invoice
} catch (error) {
        console.log(error)
}
})