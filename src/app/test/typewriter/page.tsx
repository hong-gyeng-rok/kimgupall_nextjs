import Typewriter from "@/components/common/Typewriter";

export default function TypewriterTestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-10 gap-10">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-500 mb-10">
          Framer Motion Typewriter Component Test
        </h1>

        {/* 예제 1: 큰 제목 */}
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          <Typewriter text="Hello, Framer Motion!" speed={0.1} />
        </div>

        {/* 예제 2: 본문 텍스트 */}
        <div className="text-2xl text-gray-300 font-medium">
          <Typewriter 
            text="이것은 Framer Motion으로 구현된 타이핑 효과입니다." 
            speed={0.08} 
            delay={1.5} // 첫 번째 텍스트가 어느 정도 나온 뒤 시작
          />
        </div>

        {/* 예제 3: 빠른 속도 */}
        <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/50">
          <p className="text-lg text-gray-400 font-mono">
            <Typewriter 
              text="> System initializing... Done." 
              speed={0.05} 
              delay={4} 
              className="text-green-400"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
