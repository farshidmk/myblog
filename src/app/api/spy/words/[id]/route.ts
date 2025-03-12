import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  await prisma.spyGameWord.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ message: "Deleted successfully" });
}
