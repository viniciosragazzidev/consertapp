'use server';
import { Bell, HardDrive, HelpCircle, Settings } from "lucide-react";

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

const getInitials = (name?: string | null) => {
	if (!name) return "SG";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 0) return "SG";

	const firstInitial = parts[0]?.[0] || "";
	const lastInitial = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";

	return (firstInitial + lastInitial).toUpperCase() || "SG";
};

export async function Header() {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList,

  })  
  if(!session) redirect('/login')
  const organizationMain = await getOrganizationsByUserId(session?.user.id!);
  if(organizationMain?.length === 0) redirect('/onboarding')    

 

	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	const userImage = session?.user?.image;
	const userInitials = getInitials(userName);
  const organizations = await getOrganizationsByUserId(session?.user.id!);
	return (
		<header className="border-b bg-background">
			<div className="flex h-16 items-center px-4 gap-4 justify-between">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="p-0 flex items-center gap-2 font-semibold">
							{/* Need a logo */}
							{/* <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">
                  <Image
                    width={24}
                    height={24}
                    src="/public/cloud.svg"
                    alt="cloud"
                  />
                </span>
              </div>*/}
							<span>{organizationMain?.[0]?.name}</span>
							<ChevronDown className="h-4 w-4 ml-1" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-56">
						<DropdownMenuLabel>Sources</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<HardDrive className="mr-2 h-4 w-4" />
							<span>Local Files</span>
						</DropdownMenuItem>
				
		 
						<DropdownMenuItem>
							<Plus className="mr-2 h-4 w-4" />
							<span>Add New Source</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="relative flex-1 max-w-xl">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input type="search" placeholder="Search in Drive" className="w-full pl-8 bg-muted/50" />
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
									<DropdownMenuItem onClick={() => {redirect("/profile")}} className="flex flex-col cursor-pointer hover:bg-muted items-start focus:bg-transparent">
										<div className="font-medium">{userName || "User"}</div>
										<div className="text-xs text-muted-foreground">{userEmail || "No email"}</div>
									</DropdownMenuItem>
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