import { CapacitorHttp } from "@capacitor/core";
import type { ExhibitionMedia } from "@/types/media";
import { EXHIBITION_API_URL } from "./constants";
import { isNativeExhibitionApp } from "./platform";

const assertMediaResponse = (value: unknown): ExhibitionMedia[] => {
  if (!Array.isArray(value)) {
    throw new Error("전시 데이터 응답 형식이 올바르지 않습니다.");
  }

  const hasInvalidItem = value.some(
    (item) =>
      typeof item !== "object" ||
      item === null ||
      !("id" in item) ||
      typeof item.id !== "string" ||
      !("publicUrl" in item) ||
      typeof item.publicUrl !== "string",
  );

  if (hasInvalidItem) {
    throw new Error("전시 데이터에 필수 미디어 정보가 없습니다.");
  }

  return value as ExhibitionMedia[];
};

export async function fetchRemoteMedia(): Promise<ExhibitionMedia[]> {
  if (isNativeExhibitionApp()) {
    const response = await CapacitorHttp.get({
      url: EXHIBITION_API_URL,
      responseType: "json",
      connectTimeout: 30_000,
      readTimeout: 60_000,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`전시 데이터 다운로드에 실패했습니다. (${response.status})`);
    }

    return assertMediaResponse(response.data);
  }

  const response = await fetch("/api/images");
  if (!response.ok) {
    throw new Error("이미지를 불러오는데 실패했습니다.");
  }

  return assertMediaResponse(await response.json());
}
