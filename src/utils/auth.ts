import { PrismaAdapter } from '@auth/prisma-adapter';
import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import type { Adapter } from 'next-auth/adapters';
import prisma from './db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ...add more providers here
  ],

  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
