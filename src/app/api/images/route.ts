import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1시간(3600초) 동안 캐시를 유지합니다. (ISR)
// 이후 요청이 들어오면 백그라운드에서 DB를 다시 조회하여 캐시를 갱신합니다.
export const revalidate = 3600;

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

