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
      categoryId: string;
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
    const res = await prisma.billboard.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(res);
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
      categoryId: string;
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
    const { title, billboardId } = body;

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

    const res = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        title,
        billboardId,
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
      categoryId: string;
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
    const res = await prisma.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("[DELETE]: Internal error", { status: 500 });
  }
}
