import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";



export async function PATCH(req, { params }: { params: { id: string } }) {

    try {
        const body = await req.json();
        const { name, id, phone, street, block, floor, house } = body;
        const session = await getServerSession();
        const userEmail = session.user.email;

        const updatedUser = await prisma.user.update(
            {
                where: {
                    // email: userEmail
                    id: params.id
                },
                data: {
                    name,
                    address: {
                        update: {
                            data: {
                                phonenumber: phone,
                                street: street,
                                block,
                                floor,
                                housenumber: house
                            }
                        }
                    }
                },
                include: { address: true }
            }
        )


        return NextResponse.json(true)
    } catch (error) {
        console.log("PROFILE UPDATE", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}