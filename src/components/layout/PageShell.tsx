import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  testId?: string;
}

export default function PageShell({
  children,
  testId,
}: PageShellProps) {
  return (
    <main
      data-testid={testId}
      className="relative min-h-dvh overflow-x-clip bg-none"
    >
      {(
        <div
          aria-hidden="true"
          className="pointer-events-none fixed  inset-0 z-0 bg-black "
          style={{
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
      )}

      <div className="relative z-10 min-h-dvh ">{children}</div>
    </main>
  );
}
