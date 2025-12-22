import { Storage } from "@google-cloud/storage";

// Vercel 환경변수에서 인증 정보 가져오기
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    // 중요: Vercel 환경변수에서 줄바꿈(\n)이 문자로 인식되는 문제를 해결하는 코드
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

// 우리가 사용할 버킷 이름 (환경변수로 관리하거나 직접 입력)
const bucketName = process.env.GCP_STORAGE_BUCKET || "kimgupall_images";
export const bucket = storage.bucket(bucketName);
