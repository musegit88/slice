import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismaDB";

export async function POST(req) {
  try {
    const body = await req.json();
    const { isGoogle, name, email, password, phonenumber, street, block, floorNumber, housenumber } = body;
    console.log(body)

    if (isGoogle) {
      const user = await prisma.user.create({
        data: {
          // name,
          // email,
          // password: hashPassword,
          address: {
            create: {
              phonenumber,
              street,
              block,
              floor: floorNumber,
              housenumber,
            }
          }
        }
        ,
        include: { address: true }
      });
    }

    const isExisted = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isExisted) {
      return new NextResponse("User Already exist", { status: 401 });
    }
    if (!isExisted && !isGoogle) {
      const slatRounds = 10;
      const salt = bcrypt.genSaltSync(slatRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          address: {
            create: {
              phonenumber,
              street,
              block,
              floor: floorNumber,
              housenumber,
            }
          }
        },
        include: { address: true }
      });
    }



    return NextResponse.json(true);
  } catch (error) {
    console.log("REGISTER_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
