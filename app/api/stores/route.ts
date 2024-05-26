import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

//route handler to create a store
export async function POST(req: NextRequest) {
  try {
    //check if the user is authenticated
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { title } = body;
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    //if everything is validated...
    const store = await prisma.store.create({
      data: {
        title,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const res = await prisma.store.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
