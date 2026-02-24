import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/libs/prismaDB";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // check if user already exist
    const isExisted = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user already exist
    if (isExisted) {
      return NextResponse.json({ message: "User Already exist", status: 401 });
    }

    // hash password
    const slatRounds = 10;
    const salt = bcrypt.genSaltSync(slatRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    // create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json({ message: "User registered", status: 200 });
  } catch (error) {
    console.log("REGISTER_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
