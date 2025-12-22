// app/page.tsx
"use client"; // 클라이언트 컴포넌트임을 명시
import HomeView from "../components/views/home";

export default function Home() {
  return (
    <main>
      <HomeView />
    </main>
  );
}
