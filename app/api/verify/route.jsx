import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { captchaValue } = body;
  try {
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.INVISIBLE_SECRET_KEY}&response=${captchaValue}`
    );
    return NextResponse.json(data);
  } catch (error) {
    console.log("RECAPTCHA_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
