import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Next.js가 이 API를 정적으로 캐싱하지 않도록 강제합니다.
export const dynamic = "force-dynamic";

export async function GET() {
  console.log("🔍 API: /api/images 요청 시작");
  
  try {
    const images = await prisma.image.findMany({
      orderBy: {
        createdAt: "asc", 
      },
    });

    console.log(`✅ API: 이미지 ${images.length}개 조회 성공`);
    return NextResponse.json(images);

  } catch (error: any) {
    console.error("❌ API Error 발생:", error);
    
    // 에러 내용을 클라이언트에도 전달하여 화면에서 확인 가능하게 함
    return NextResponse.json(
      { error: "이미지 조회 실패", message: error.message },
      { status: 500 }
    );
  }
}