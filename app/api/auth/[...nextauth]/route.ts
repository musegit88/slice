import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import prisma from "@/libs/prismaDB";
import { PrismaAdapter } from "@auth/prisma-adapter"



export const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: {
                    label: "Password", type: "password"
                }

            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentials")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user.password) {
                    throw new Error("Invalid credentials")
                }
                const passwordCheck = await bcrypt.compare(
                    credentials.password,
                    user.password
                )
                if (!passwordCheck) {
                    throw new Error("Invalid credentials")
                }
                return user
            }
        })
    ],

    session: {
        strategy: "jwt"
    }
});

export { handler as GET, handler as POST };
