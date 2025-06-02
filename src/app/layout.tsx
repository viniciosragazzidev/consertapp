import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import LoadingSkeleton from "@/components/LoadingSkeleton"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ConsertApp - Better Cloud Storage",
  description: "A modern cloud storage solution",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >        <Toaster />

        <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
