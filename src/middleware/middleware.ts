import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Authorization token is missing" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");

    request["user"] = decoded;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/protected/*"],
};
