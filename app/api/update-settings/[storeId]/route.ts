import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  try {
    const storeId = params.storeId;
    const body = await req.json();
    const { title } = body;
    const res = await prisma.store.updateMany({
      where: {
        id: storeId,
        userId: user.id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("Error [PATCH]");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  //check if the user is authenticated
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const res = await prisma.store.delete({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
}
