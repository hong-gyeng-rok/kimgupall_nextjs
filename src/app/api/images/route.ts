import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await prisma.media.findMany({
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
