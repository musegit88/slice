import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";



export async function POST(req) {
  const body = await req.json()
  const { id, phone, street, block, floor, house } = body

  try {
    const profile = await prisma.user.create({
      // where:{
      //   id
      // },
      data: {
        address: {
          create: {
            phonenumber: phone,
            street: street,
            block,
            floor,
            housenumber: house
          }
        }
      }
    })
    return NextResponse.json("True for profile")
  } catch (error) {
    console.log("PROFILE_CREATE_FOR_GOOGLE_USER", error)
    return new NextResponse("Internal server error", { status: 500 })
  }

}