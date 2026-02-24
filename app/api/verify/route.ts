import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { captchaValue } = body;
  try {
    const verify = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.INVISIBLE_SECRET_KEY}&response=${captchaValue}`,
    );
    const data = await verify.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("RECAPTCHA_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
