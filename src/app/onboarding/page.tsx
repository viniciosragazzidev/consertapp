"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WelcomeScreen } from "@/components/onboarding/welcome-screen"
import { CreateOrganizationScreen } from "@/components/onboarding/create-organization-screen"
import { InviteMembersScreen } from "@/components/onboarding/invite-members-screen"
import { JoinAsGuestScreen } from "@/components/onboarding/join-as-guest-screen"

export type OnboardingStep = "welcome" | "create-org" | "invite-members" | "join-guest"

export interface OrganizationData {
  name: string
  slug: string
  description: string
  website: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface InviteMember {
  id: string
  email: string
  role: string
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    name: "",
    slug: "",
    description: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  })
  const [inviteMembers, setInviteMembers] = useState<InviteMember[]>([])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait" custom={1}>
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <WelcomeScreen onNext={setCurrentStep} />
            </motion.div>
          )}

          {currentStep === "create-org" && (
            <motion.div
              key="create-org"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <CreateOrganizationScreen
                onNext={setCurrentStep}
                onBack={setCurrentStep}
                organizationData={organizationData}
                setOrganizationData={setOrganizationData}
              />
            </motion.div>
          )}

          {currentStep === "invite-members" && (
            <motion.div
              key="invite-members"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <InviteMembersScreen
                onBack={setCurrentStep}
                organizationData={organizationData}
                inviteMembers={inviteMembers}
                setInviteMembers={setInviteMembers}
              />
            </motion.div>
          )}

          {currentStep === "join-guest" && (
            <motion.div
              key="join-guest"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <JoinAsGuestScreen onBack={setCurrentStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
