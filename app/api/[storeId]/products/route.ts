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
      storeId: string;
    };
  }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId) {
      return new NextResponse("Store is required.", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("error.");
  }
}

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
  const session = await auth();
  const user = session?.user;
  if (!user) {
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
      userId: user.id,
      id: params.storeId,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      sizeId,
      colorId,
      storeId: params.storeId,
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
    },
  });
  console.log(product);
  return NextResponse.json(product);
}
