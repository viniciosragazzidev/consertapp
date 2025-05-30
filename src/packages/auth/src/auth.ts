import { betterAuth, type BetterAuthOptions } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, customSession } from "better-auth/plugins";

import { ac, roles } from "./permissions";
// import { hashPassword, verifyPassword } from "@/lib/argon2";
import { prisma } from "@/packages/db/prisma";

const options = {
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
 
  // emailAndPassword: {
  //   enabled: true,
  //   minPasswordLength: 6,
  //   autoSignIn: false,
  //   password: {
  //     hash: hashPassword,
  //     verify: verifyPassword,
  //   },
    
  // },

  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
      ac,
      roles,
    }),
   
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      return {
        session: {
          expiresAt: session.expiresAt,
          token: session.token,
          userAgent: session.userAgent,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          role: user.role,
          giraffeFact: "giraffes can sometimes nap with one eye open",
        },
      };
    }, options),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";