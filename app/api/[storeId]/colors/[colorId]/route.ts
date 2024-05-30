import { colorsFormType } from "@/app/(dashboard)/[storeId]/colors/(components)/color-form";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const body: colorsFormType = await req.json();
  const { name, value } = body;
  const storeByUserId = await prisma.store.findUnique({
    where: {
      userId: user.id,
      id: params.storeId,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Unauthorized");
  }
  const res = await prisma.color.update({
    where: {
      id: params.colorId,
      storeId: params.storeId,
    },
    data: {
      name,
      value,
    },
  });
  return NextResponse.json(res);
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
      colorId: string;
    };
  }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const storeByUserId = await prisma.store.findUnique({
    where: {
      userId: user.id,
      id: params.storeId,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Your dont have access to the store.");
  }
  try {
    const res = await prisma.color.delete({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("Error deleting Color.");
  }
}
