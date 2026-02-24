import Stripe from "stripe";
import prisma from "@/libs/prismaDB";
import { NextRequest, NextResponse } from "next/server";
import { CartItem, UserAddress } from "@/types";
import { isValidPhoneNumber } from "libphonenumber-js";

interface Body {
  userAddress: UserAddress;
  cartItems: CartItem[];
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json();
  const { userAddress, cartItems } = body;
  const userEmail = userAddress.email;
  const isDefaultAddress = userAddress.isDefault;
  const isValidPhone = isValidPhoneNumber(userAddress.phoneNumber);

  // check if address is default
  if (!isDefaultAddress && !isValidPhone) {
    return NextResponse.json(
      { error: "Address is not default" },
      { status: 400 },
    );
  }

  // check if phone number is valid
  if (!isValidPhone) {
    return NextResponse.json(
      { error: "Phone number is not valid" },
      { status: 400 },
    );
  }

  const order = await prisma.order.create({
    data: {
      ...userAddress,
      cartItems,
      paid: false,
    },
  });

  //  Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

  const lineItems = [];
  for (const cartItem of cartItems) {
    const itemName = cartItem.name;
    const itemData = await prisma.menu.findUnique({
      where: {
        id: cartItem.menuId,
      },
    });
    let itemPrice = itemData.price;
    if (cartItem.sizes?.length > 0) {
      for (const sizes of cartItem.sizes) {
        const itemSize = itemData?.sizes.find(
          (size) => size.name === sizes.name,
        );
        itemPrice += itemSize.extraPrice;
      }
    }
    if (cartItem.extras?.length > 0) {
      for (const extras of cartItem.extras) {
        const extraItem = itemData?.extras.find(
          (extra) => extra.name === extras.name,
        );
        itemPrice += extraItem.extraPrice;
      }
    }
    if (cartItem.quantity > 1) {
      // divide by 100 to include cents
      itemPrice = ((itemPrice * cartItem.quantity) / 100) * 100;
    }
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name:
            cartItem.quantity &&
            itemName +
              (cartItem.sizes.length > 0
                ? " - " + cartItem.sizes[0]?.name
                : "") +
              (cartItem.extras.length > 0
                ? " with " + cartItem.extras[0]?.name
                : "") +
              " x " +
              cartItem.quantity,
        },
        unit_amount: Number(itemPrice),
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + "order/",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: order.id },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 400, currency: "USD" },
        },
      },
    ],
  });
  return NextResponse.json({ link: stripeSession.url });
}
