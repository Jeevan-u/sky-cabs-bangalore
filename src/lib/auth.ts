import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { d1Client } from "@/backend";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Phone or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Please provide your Phone/Email and Password.");
        }

        const user = await d1Client.getUserByPhoneOrEmail(credentials.identifier);
        if (!user) {
          throw new Error("No account found with this mobile number or email.");
        }

        if (user.password !== credentials.password) {
          throw new Error("Invalid password. Please check and try again.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email || `${user.phone}@srisadhgurutoursandtravels.com`,
          phone: user.phone,
          role: user.role,
          assigned_vehicle: user.assigned_vehicle || "",
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.phone = (user as any).phone;
        token.assigned_vehicle = (user as any).assigned_vehicle;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).phone = token.phone;
        (session.user as any).assigned_vehicle = token.assigned_vehicle;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "sri-sadhguru-travels-secret-jwt-key-2026",
};
