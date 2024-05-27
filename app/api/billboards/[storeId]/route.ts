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
  try {
    const storeId = params.storeId;
    const body = await req.json();
    const { title, imgUrl } = body;
    const res = await prisma.billboard.create({
      data: {
        storeId,
        title,
        imgUrl,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return new NextResponse("Error creating billboard");
  }
}
