import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function checkIsAuthenticated(request: Request) {
  const token = await getToken({ req: request });
  if (!token || (token.exp && token.exp < Date.now() / 1000)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return token;
}
