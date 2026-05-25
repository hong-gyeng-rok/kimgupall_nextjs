const lanternGlowStyles = `
  @keyframes intro-lantern-wake {
    0% {
      opacity: 0;
      transform: translate3d(-50%, -4%, 0) scale(0.96);
    }
    100% {
      opacity: 1;
      transform: translate3d(-50%, 0, 0) scale(1);
    }
  }

  @keyframes intro-lantern-flicker {
    0%, 100% {
      opacity: 0.38;
      transform: scale(1);
    }
    35% {
      opacity: 0.52;
      transform: scale(1.03);
    }
    68% {
      opacity: 0.3;
      transform: scale(0.98);
    }
  }

  @keyframes intro-neon-power-on {
    0% {
      opacity: 0.08;
      filter: blur(34px) brightness(0.55);
      transform: translate3d(-50%, -50%, 0) scale(0.94);
    }
    7% {
      opacity: 0.72;
      filter: blur(18px) brightness(1.45);
    }
    12% {
      opacity: 0.26;
      filter: blur(30px) brightness(0.75);
    }
    20% {
      opacity: 0.96;
      filter: blur(14px) brightness(1.8);
      transform: translate3d(-50%, -50%, 0) scale(1.02);
    }
    34% {
      opacity: 0.72;
      filter: blur(24px) brightness(1.15);
    }
    52% {
      opacity: 1;
      filter: blur(16px) brightness(1.5);
      transform: translate3d(-50%, -50%, 0) scale(1.04);
    }
    76% {
      opacity: 0.82;
      filter: blur(22px) brightness(1.18);
    }
    92% {
      opacity: 0.68;
      filter: blur(28px) brightness(0.95);
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
    100% {
      opacity: 0.08;
      filter: blur(34px) brightness(0.55);
      transform: translate3d(-50%, -50%, 0) scale(0.94);
    }
  }

  @keyframes intro-neon-breathe {
    0%, 100% {
      opacity: 0.72;
      filter: blur(20px);
    }
    50% {
      opacity: 1;
      filter: blur(30px);
    }
  }

  @keyframes intro-neon-spark {
    0%, 100% {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.9);
    }
    10%, 24%, 54% {
      opacity: 0.38;
      transform: translate3d(-50%, -50%, 0) scale(1.04);
    }
    18%, 34%, 68% {
      opacity: 0.08;
    }
    82% {
      opacity: 0.22;
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }

  @keyframes intro-grain-drift {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 0.1;
    }
    50% {
      transform: translate3d(-1.5%, 1%, 0);
      opacity: 0.18;
    }
    100% {
      transform: translate3d(1%, -1.5%, 0);
      opacity: 0.12;
    }
  }
`;

export default function IntroLanternGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-screen">
      <style>{lanternGlowStyles}</style>

      <div
        className="absolute left-1/2 top-[-28%] h-[76%] w-[72%] rounded-full"
        style={{
          animation: "intro-lantern-wake 0.9s ease-out 0.15s both",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: "intro-lantern-flicker 5.8s ease-in-out 1.05s infinite",
            background:
              "radial-gradient(ellipse at top center, rgba(255, 224, 148, 0.42) 0%, rgba(255, 196, 87, 0.2) 28%, rgba(255, 255, 255, 0.08) 48%, transparent 72%)",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 top-1/2 h-[58%] w-[52%] rounded-full"
        style={{
          animation: "intro-neon-power-on 14s ease-in-out 0.75s infinite",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: "intro-neon-breathe 7s ease-in-out infinite",
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 245, 0.82) 0%, rgba(255, 228, 154, 0.52) 28%, rgba(255, 184, 58, 0.28) 50%, transparent 74%)",
            boxShadow:
              "0 0 36px rgba(255, 255, 232, 0.86), 0 0 96px rgba(255, 218, 126, 0.62), 0 0 170px rgba(255, 154, 38, 0.42)",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 top-1/2 h-[44%] w-[38%] rounded-full"
        style={{
          animation: "intro-neon-spark 14s ease-in-out 0.75s infinite",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,225,150,0.48) 42%, transparent 72%)",
          boxShadow: "0 0 28px rgba(255,255,255,0.8)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,205,0.4),rgba(255,196,86,0.2)_34%,transparent_68%),radial-gradient(ellipse_at_top,rgba(255,213,128,0.16),transparent_62%),linear-gradient(180deg,rgba(255,213,128,0.08),transparent_44%,rgba(0,0,0,0.18))]" />

      <div
        className="absolute inset-[-12%] opacity-20"
        style={{
          animation: "intro-grain-drift 8s steps(3, end) infinite alternate",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0 1px, transparent 1px), radial-gradient(circle, rgba(255,211,122,0.45) 0 1px, transparent 1px)",
          backgroundPosition: "0 0, 18px 24px",
          backgroundSize: "42px 42px, 58px 58px",
        }}
      />
    </div>
  );
}
