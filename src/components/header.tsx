'use server';
import { Bell, Building2, HardDrive, HelpCircle, Settings } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Plus, Server } from "lucide-react";
// import Image from "next/image";
import {  signOut, useSession } from "@/packages/auth/src/auth-client";
 
import { LogOut, Search } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./auth/signout-button";
import { redirect } from "next/navigation";
import { getOrganizationsByUserId } from "@/actions/organization";
import { headers } from "next/headers";
import { auth } from "@/packages/auth/src/auth";
import OrganizationsSelect from "./organizations-select";

const getInitials = (name?: string | null) => {
	if (!name) return "SG";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 0) return "SG";

	const firstInitial = parts[0]?.[0] || "";
	const lastInitial = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";

	return (firstInitial + lastInitial).toUpperCase() || "SG";
};

export async function Header({organizationMain, session}: {organizationMain: any, session: any}) {
 
 

	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	const userImage = session?.user?.image;
	const userInitials = getInitials(userName);
  const organizations = await getOrganizationsByUserId(session?.user.id!);
	return (
		<header className="border-b bg-background">
			<div className="flex h-16 items-center px-4 gap-4 justify-between">
			<OrganizationsSelect organizations={organizations} organizationMain={organizationMain} />
				<div className="relative flex-1 max-w-xl">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input type="search" placeholder="Search in Drive" className="w-full pl-8 bg-muted/30" />
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<Button variant="ghost" size="icon">
						<HelpCircle className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon">
						<Settings className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon">
						<Bell className="h-5 w-5" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full">
								<Avatar className="h-8 w-8">
									{userImage && <AvatarImage src={userImage} alt={userName || "User"} />}
									<AvatarFallback>{ userInitials}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{ session?.user ? (
								<>
									<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
									<DropdownMenuSeparator />
									 <Link href="/profile">
									 
									 <DropdownMenuItem className="flex flex-col cursor-pointer hover:bg-muted items-start focus:bg-transparent">
										<div className="font-medium">{userName || "User"}</div>
										<div className="text-xs text-muted-foreground">{userEmail || "No email"}</div>
									</DropdownMenuItem></Link>
									<DropdownMenuSeparator />
									<DropdownMenuItem >
								     <SignOutButton>

                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair da conta</span>
                    </SignOutButton>
									</DropdownMenuItem>
								</>
							) : (
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link href="/login">Log In</Link>
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}