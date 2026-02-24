import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature");
  let event: Stripe.Event;

  const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SIGNING_SECRET,
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const isPaid = session.payment_status === "paid";
    if (isPaid) {
      const order = await prisma.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          paid: true,
        },
      });
      await prisma.cart.deleteMany({
        where: {
          id: {
            in: order.cartItems.map((cart) => cart.id),
          },
        },
      });
    }
  }
  return NextResponse.json("True", { status: 200 });
}
