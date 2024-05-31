import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId) {
      return new NextResponse("Product required.", { status: 400 });
    }
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        size: true,
        category: true,
        color: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Something went wrong.");
  }
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string; storeId: string } }
) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }
  const body = await req.json();
  const {
    name,
    price,
    categoryId,
    colorId,
    sizeId,
    images,
    isFeatured,
    isArchived,
  } = body;
  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }
  if (!images || !images.length) {
    return new NextResponse("Images are required", { status: 400 });
  }
  if (!price) {
    return new NextResponse("Price is required", { status: 400 });
  }
  if (!categoryId) {
    return new NextResponse("Category is required", { status: 400 });
  }
  if (!sizeId) {
    return new NextResponse("Size is required", { status: 400 });
  }
  if (!colorId) {
    return new NextResponse("Color is required", { status: 400 });
  }
  const storeByUserId = await prisma.store.findUnique({
    where: {
      userId,
      id: params.storeId,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Store is needed.", { status: 403 });
  }
  try {
    await prisma.product.update({
      where: {
        storeId: params.storeId,
        id: params.productId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
      },
    });
    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
      productId: string;
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
    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("[DELETE]: Internal error", { status: 500 });
  }
}
