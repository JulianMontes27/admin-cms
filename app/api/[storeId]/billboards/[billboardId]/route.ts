import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      billboardId: string;
    };
  }
) {
  //check for auth
  try {
    const res = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    if (res) {
      const response = {
        id: res.id,
        name: res.title,
        imgUrl: res.imgUrl,
      };
      return NextResponse.json(response);
    }
  } catch (error) {
    return new NextResponse("[GET]: Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
      billboardId: string;
    };
  }
) {
  //check for auth
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  try {
    const body = await req.json();
    const { title, imgUrl } = body;

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId: user.id,
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 403,
      });
    }

    const res = await prisma.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        title,
        imgUrl,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
      billboardId: string;
    };
  }
) {
  //check for auth
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const storeByUserId = await prisma.store.findUnique({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  try {
    const res = await prisma.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("[DELETE]: Internal error", { status: 500 });
  }
}
