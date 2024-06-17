import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { CollageImage } from "@prisma/client";

import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface CollageFormProps {
  name: string;
  desc: string;
  collageImages: CollageImage[];
}

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
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  const body: CollageFormProps = await req.json();
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
      userId: user.id,
      id: params.storeId,
    },
  });
  if (!storeByUserId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const collage = await prisma.collage.create({
    data: {
      name,
      desc,
      storeId: params.storeId,
      collageImages: {
        createMany: {
          data: [...collageImages.map((image: { url: string }) => image)],
        },
      },
    },
  });
  return NextResponse.json(collage);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const collages = await prisma.collage.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        collageImages: true,
      },
    });
    return NextResponse.json(collages);
  } catch (error) {
    return new NextResponse("[GET] error");
  }
}
