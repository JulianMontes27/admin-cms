import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  //check for auth
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const body = await req.json();
  const { name, value } = body;

  //make sure that the user trying to access this route has the store
  const storeByUserId = await prisma.store.findUnique({
    where: {
      userId: user.id,
      id: params.storeId,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const res = await prisma.color.create({
    data: {
      storeId: params.storeId,
      name,
      value,
    },
  });
  return NextResponse.json(res);
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  // //check for auth
  // const session = await auth();
  // const user = session?.user;
  // if (!user) {
  //   redirect("/api/auth/signin");
  // }
  try {
    const data = await prisma.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
