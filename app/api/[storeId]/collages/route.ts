import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

//create a collage
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  //check for session
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  if (!params.storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  //find the store with user
  const storeWithUserId = await prisma.store.findUnique({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });

  if (!storeWithUserId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, desc, images } = body;
    //get the billboard id
    const res = await prisma.collage.create({
      data: {
        storeId: params.storeId,
        name,
        desc,
        images,
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
    const res = await prisma.collage.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("[GET] error");
  }
}
