'use client'
import { getOrganizationInvoices } from '@/actions/invoices';
import { Invoice } from '@/lib/@types/schema.types';
import { useAppStore } from '@/lib/store/appStore';
import React, { useEffect } from 'react'

const Orders = () => {
      const { org } = useAppStore();
    const currentOrg = org.currentOrg
    const [invoicesData, setInvoicesData] = React.useState<Invoice  [] | undefined>([])
    const invoices = async () => {
        const res = await getOrganizationInvoices(currentOrg?.id as string)
        setInvoicesData(res)
        console.log(res)
    }


    useEffect(() => {
        invoices()
    }, [ currentOrg ])
  return (
    <div>Orders {currentOrg?.name} -
     <ul>
        {invoicesData?.map((invoice) => (
            <li key={invoice.id}>{invoice.invoiceNumber}</li>
        ))}
     </ul>
    </div>
  )
}

export default Orders