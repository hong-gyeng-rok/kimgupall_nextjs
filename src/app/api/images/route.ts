import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get("location");
    const collectionSlug = searchParams.get("collection");

    const whereCondition: Prisma.MediaWhereInput = {};

    if (location) {
      whereCondition.location = location;
    }

    if (collectionSlug) {
      whereCondition.collection = {
        slug: collectionSlug,
      };
    }

    const images = await prisma.media.findMany({
      where: whereCondition,
      orderBy: {
        orderIndex: "desc",
      },
      include: {
        collection: true,
      },
    });

    return NextResponse.json(images);
  } catch (error: unknown) {
    let errorMessage = "알 수 없는 에러";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: "이미지 조회 실패", message: errorMessage },
      { status: 500 },
    );
  }
}
