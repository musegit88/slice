import { NextResponse } from "next/server";
export async function POST(req) {
  const data = await req.formData();
  // console.log(data);
  const file = data.get("file");
  // console.log(file.name);
  const name = file.name;
  const ext = name.split(".").slice(-1)[0];
  // console.log(ext);
  // if (data.get("file")) {
  //   console.log("file found", data.get("file"));
  // }
  return NextResponse.json("true");
  try {
  } catch (error) {
    console.log("UPLOAD ERROR", error);
    return new NextResponse("Internl server error", { status: 500 });
  }
}
