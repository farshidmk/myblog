import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.spyGameWord.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "Deleted successfully" });
}
