import { sizesFormType } from "@/app/(dashboard)/[storeId]/sizes/(components)/size-form";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const body: sizesFormType = await req.json();
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
  try {
    const res = await prisma.size.update({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("Error");
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
      sizeId: string;
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
    const res = await prisma.size.delete({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("Error deleting Size.");
  }
}
