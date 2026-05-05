import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  bgImgSrc?: string | null;
  testId?: string;
}

export default function PageShell({
  children,
  bgImgSrc,
  testId,
}: PageShellProps) {
  return (
    <main
      data-testid={testId}
      className="relative min-h-dvh overflow-x-clip bg-none"
    >
      {bgImgSrc && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed  inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${bgImgSrc})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
      )}

      <div className="relative z-10 min-h-dvh">{children}</div>
    </main>
  );
}
