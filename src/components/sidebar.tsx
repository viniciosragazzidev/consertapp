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
import { useRouter } from "next/navigation";
 

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
  <>
  
     <div className={`w-64 border-r transition-all bg-background p-4 flex flex-col min-h-full max-md:fixed ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Button className="w-full justify-start gap-2 mb-6">
          <Plus className="h-4 w-4" />

Nova organização
        </Button>

        <nav className="space-y-1">
  
                     <Button onClick={() => router.push("/")} variant="ghost" className="w-full justify-start gap-2">

                  <Eye className="h-4 w-4" />
                  <span>Visão Geral</span>
              </Button>
          

          <Button onClick={() => router.push("/services")} variant="ghost" className="w-full justify-start gap-2">
            <Wrench className="h-4 w-4" />
Serviços          </Button>
          <Button variant="ghost" onClick={() => router.push("/clients")} className="w-full justify-start gap-2">
            <Users2 className="h-4 w-4" />
            Clientes
          </Button>
          <Button variant="ghost" onClick={() => router.push("/sales")} className="w-full justify-start gap-2">
            <ShoppingBag className="h-4 w-4" />
            Vendas
          </Button>
          <Button variant="ghost" onClick={() => router.push("/stock")} className="w-full justify-start gap-2">
            <Box className="h-4 w-4" />
            Estoque
          </Button>
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
