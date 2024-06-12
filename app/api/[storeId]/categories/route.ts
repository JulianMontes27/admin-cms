import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  if (!params.storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const storeIdByUserId = prisma.store.findUnique({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });
  if (!storeIdByUserId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, billboardId } = body;

    //get the billboard id
    const res = await prisma.category.create({
      data: {
        title,
        storeId: params.storeId,
        billboardId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const res = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("[GET] error");
  }
}
