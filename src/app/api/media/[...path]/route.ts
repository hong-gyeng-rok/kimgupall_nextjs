import { Readable } from "node:stream";
import { NextRequest, NextResponse } from "next/server";
import { bucket } from "@/lib/gcp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MediaRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const CACHE_CONTROL = "public, max-age=31536000, immutable";

const parseRangeHeader = (rangeHeader: string | null, size: number) => {
  if (!rangeHeader) return null;

  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
  if (!match) return null;

  const [, startValue, endValue] = match;
  if (!startValue && !endValue) return null;

  let start = startValue ? Number(startValue) : 0;
  let end = endValue ? Number(endValue) : size - 1;

  if (!startValue && endValue) {
    const suffixLength = Number(endValue);
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  }

  if (
    Number.isNaN(start) ||
    Number.isNaN(end) ||
    start < 0 ||
    end < start ||
    start >= size
  ) {
    return null;
  }

  return {
    start,
    end: Math.min(end, size - 1),
  };
};

const createHeaders = ({
  contentType,
  size,
}: {
  contentType: string;
  size: number;
}) =>
  new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": CACHE_CONTROL,
    "Content-Length": String(size),
    "Content-Type": contentType,
  });

export async function GET(request: NextRequest, context: MediaRouteContext) {
  const { path } = await context.params;
  const objectPath = path.join("/");

  if (!objectPath || objectPath.includes("..")) {
    return NextResponse.json({ error: "Invalid media path" }, { status: 400 });
  }

  const file = bucket.file(objectPath);

  try {
    const [metadata] = await file.getMetadata();
    const size = Number(metadata.size ?? 0);
    const contentType =
      metadata.contentType ?? "application/octet-stream";
    const range = parseRangeHeader(request.headers.get("range"), size);

    if (range) {
      const stream = file.createReadStream({
        start: range.start,
        end: range.end,
      });
      const body = Readable.toWeb(stream) as ReadableStream;
      const headers = createHeaders({
        contentType,
        size: range.end - range.start + 1,
      });

      headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);

      return new Response(body, {
        status: 206,
        headers,
      });
    }

    const stream = file.createReadStream();
    const body = Readable.toWeb(stream) as ReadableStream;

    return new Response(body, {
      headers: createHeaders({ contentType, size }),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Failed to load media from GCS: ${objectPath}`, error);
    }

    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }
}
