"use server";

import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { auth } from "../packages/auth/src/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getOrganizationsByUserId } from "../actions/organization";


export default async function DrivePage() {
    const headersList = await headers()
  
    const session = await auth.api.getSession({
      headers: headersList,
    })  
    if(!session) redirect('/login')
    const organizationMain = await getOrganizationsByUserId(session?.user.id!);
    if(organizationMain?.length === 0) redirect('/onboarding')    
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header organizationMain={organizationMain} session={session} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
         
        </main>
      </div>
    </div>
  );
}
