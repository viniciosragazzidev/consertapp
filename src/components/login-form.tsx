"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "@/packages/auth/src/auth-client";
import { cn } from "@/lib/utils";
import { SignInOauthButton } from "./auth/signin-oauth-button";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-0", className)} {...props}>
      <Card className="py-8 gap-6">
        <CardHeader className="gap-2">
          <CardTitle className="text-center">
            Login to experience ConsertApp
          </CardTitle>
          <CardDescription className="text-center">
            Your data just got better.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
         <SignInOauthButton provider="google" />
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm text-neutral-600">
        By signing in, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 cursor-pointer"
        >
          terms of service
        </Link>
        .
      </div>
    </div>
  );
}
