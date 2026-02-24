import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isValidPhoneNumber } from "libphonenumber-js";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { name, addresses } = body;

  try {
    // Update user name
    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
    });

    // Update addresses
    if (addresses && Array.isArray(addresses)) {
      for (const address of addresses) {
        // validate phone number is valid for the specified country code
        const isValidPhone = isValidPhoneNumber(address.phonenumber, "ET");
        if (!isValidPhone) {
          return NextResponse.json("Invalid phone number", { status: 400 });
        }
        if (isValidPhone && address.id) {
          await prisma.address.update({
            where: { id: address.id },
            data: {
              label: address.label,
              phonenumber: address.phonenumber,
              street: address.street,
              block: address.block,
              floor: address.floor,
              housenumber: address.housenumber,
              isApartement: address.isApartement,
              isDefault: address.isDefault,
            },
          });
        } else {
          await prisma.address.create({
            data: {
              label: address.label,
              phonenumber: address.phonenumber,
              street: address.street,
              block: address.block,
              floor: address.floor,
              housenumber: address.housenumber,
              isApartement: address.isApartement,
              isDefault: address.isDefault,
              userId: params.id,
            },
          });
        }
      }
    }

    return NextResponse.json("True");
  } catch (error) {
    console.log("USER_Update_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const { addressId } = body;
  try {
    await prisma.address.delete({
      where: {
        userId: params.id,
        id: addressId,
      },
    });
    return NextResponse.json("True");
  } catch (error) {
    console.log("USER_DELETE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
