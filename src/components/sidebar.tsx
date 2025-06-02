"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Plus,
  Folder,
  HardDrive,
  Share,
  Star,
  Trash,
  Eye,
  Wrench,
  Users2,
  ShoppingBag,
  Box,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePathname, useRouter } from "next/navigation";
 

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname  = usePathname();
  const current = pathname.split("/")[1];
  const navItems = [
    {
      name: "Visão Geral",
      href: "/",
      icon: <Eye className="h-4 w-4" />,
    },
    {
      name: "Serviços",
      href: "/services",
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      name: "Clientes",
      href: "/clients",
      icon: <Users2 className="h-4 w-4" />,
    },
    {
      name: "Vendas",
      href: "/sales",
      icon: <ShoppingBag className="h-4 w-4" />,
    },
  ]

  return (
  <>
  
     <div className={`w-64 border-r transition-all bg-background p-4 flex flex-col min-h-full max-md:fixed ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Button className="w-full justify-start gap-2 mb-6">
          <Plus className="h-4 w-4" />

Nova organização
        </Button>

        <nav className="space-y-1">
  
             
          

          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full hover:bg-primary/5 justify-start gap-2 ${item.href === `/${current}` ? "bg-primary/5 border border-primary/5" : ""}`}
              onClick={() => router.push(item.href)}
            >
 <span className={`${item.href === `/${current}` ? "text-primary" : ""}`}>
              {item.icon}

 </span>
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t bg-background">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Storage</h3>
          <Progress value={8} className="h-2" />
          <p className="text-xs text-muted-foreground">158.3 GB of 2 TB used</p>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Get more storage
          </Button>
        </div>
      </div>
    </div>
    
    <span className="md:hidden cursor-pointer">
      <button
        className={`fixed top-20 left-6 transition-all cursor-pointer ${isOpen ? "translate-x-[240px]" : ""} z-50`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
    </span>
    </>
  );
}
