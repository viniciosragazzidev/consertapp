'use client'


import { Organization } from '@/generated/prisma'
import React, { useEffect } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { Building2, ChevronDown, Hammer, Loader, Plus } from 'lucide-react';
import { useAppStore } from '@/lib/store/appStore';
const OrganizationsSelect = ({organizations, organizationMain} : {organizations:  any[] | undefined , organizationMain: Organization[] | undefined }) => {
    const { org } = useAppStore();
 
	const containCurrentOrgInOrganizations = organizations?.some((organization) => organization.id === org.currentOrg?.id);
	   if (!containCurrentOrgInOrganizations && org.currentOrg?.id) {
	   org.setCurrentOrg(organizationMain![0]);
   }
	
	return (
	<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="p-0 flex items-center gap-2 font-semibold">
							{/* Need a logo */}
						<span>
							<Hammer className="mr-2 h-4 w-4 text-primary" />
						</span>
							<span>{org.currentOrg?.name || <span><Loader className="animate-spin" /></span>}</span>
							<ChevronDown className="h-4 w-4 ml-1" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-56">
						<DropdownMenuLabel>Organizações</DropdownMenuLabel>
						<DropdownMenuSeparator />
								
				 { organizations?.map((organization) => (	
						<DropdownMenuItem onClick={() => org.setCurrentOrg(organization)} key={organization.id}>
							<Building2 className="mr-2 h-4 w-4" />
							<span>{organization.name}</span>
						</DropdownMenuItem>
						)) }
						<DropdownMenuSeparator />
		 
						<DropdownMenuItem>
							<Plus className="mr-2 h-4 w-4" />
							<span>Adicionar nova</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
  )
}

export default OrganizationsSelect