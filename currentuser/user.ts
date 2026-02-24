"use server";

import { getServerSession } from "next-auth/next";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismaDB";

interface SessionProps {
  user?: {
    name: string;
    email: string;
    image: string;
  };
}

export async function getSession() {
  return await getServerSession(handler);
}

export const getUser = async () => {
  try {
    const session: SessionProps = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        address: true,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    return null;
  }
};
