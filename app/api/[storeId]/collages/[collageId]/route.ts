import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collageId: string } }
) => {
  try {
    if (!params.collageId) {
      return new NextResponse("Collage required.", { status: 400 });
    }
    const collage = await prisma.collage.findUnique({
      where: {
        id: params.collageId,
      },
      include: {
        collageImages: true,
      },
    });
    return NextResponse.json(collage);
  } catch (error) {
    return new NextResponse("Something went wrong.");
  }
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { collageId: string; storeId: string } }
) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }

  const body = await req.json();
  const { name, desc, collageImages } = body;

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }
  if (!collageImages || !collageImages.length) {
    return new NextResponse("Images are required", { status: 400 });
  }
  if (!desc) {
    return new NextResponse("Description is required", { status: 400 });
  }

  const storeByUserId = await prisma.store.findUnique({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!storeByUserId) {
    return new NextResponse("Store is needed.", { status: 403 });
  }

  try {
    await prisma.collage.update({
      where: {
        storeId: params.storeId,
        id: params.collageId,
      },
      data: {
        name,
        desc,
        collageImages: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.collage.update({
      where: {
        id: params.collageId,
      },
      data: {
        collageImages: {
          createMany: {
            data: [...collageImages.map((image: { url: string }) => image)],
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
      collageId: string;
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
    const collage = await prisma.collage.deleteMany({
      where: {
        id: params.collageId,
      },
    });
    return NextResponse.json(collage);
  } catch (error) {
    return new NextResponse("[DELETE]: Internal error", { status: 500 });
  }
}
