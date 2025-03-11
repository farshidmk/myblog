import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.spyGameWordCategory.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "Deleted successfully" });
}
