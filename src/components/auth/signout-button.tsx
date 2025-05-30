"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/packages/auth/src/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SignOutButton = ({children} : { children: React.ReactNode} ) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You’ve logged out. See you soon!");
          router.push("/login");
        },
      },
    });
  }

  return (
    <span 
      onClick={handleClick}
      className={`cursor-pointer flex items-center gap-1 text-sm ${isPending ? "pointer-events-none opacity-50" : ""}`}
      

  >
        {children}
    </span>
  );
};