"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { App } from "@capacitor/app";
import {
  SystemBars,
  SystemBarsStyle,
} from "@capacitor/core";
import { Network } from "@capacitor/network";
import { isNativeExhibitionApp } from "@/lib/exhibitionCache/platform";
import { loadCachedExhibition } from "@/lib/exhibitionCache/storage";
import { syncExhibitionAssets } from "@/lib/exhibitionCache/syncExhibitionAssets";
import type {
  ExhibitionCacheManifest,
  ExhibitionSyncProgress,
} from "@/lib/exhibitionCache/types";

const ANDROID_BACK_EVENT = "kimgupall:android-back";
const RESTORE_ALBUM_SECTION_KEY = "kimgupall:restore-section-album";
const isCapacitorBundle =
  process.env.NEXT_PUBLIC_CAPACITOR_BUILD === "1";

type BootState = "checking" | "syncing" | "ready" | "error";

const initialProgress: ExhibitionSyncProgress = {
  completed: 0,
  total: 0,
  label: "전시 데이터를 확인하고 있습니다",
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

export default function ExhibitionRuntime({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const pathnameRef = useRef(pathname);
  const bootStateRef = useRef<BootState>(
    isCapacitorBundle ? "checking" : "ready",
  );
  const [bootState, setBootState] = useState<BootState>(bootStateRef.current);
  const [progress, setProgress] = useState(initialProgress);
  const [errorMessage, setErrorMessage] = useState("");
  const [manifest, setManifest] = useState<ExhibitionCacheManifest | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const adminOpenRef = useRef(false);
  const tapCountRef = useRef(0);
  const tapResetRef = useRef<number | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const updateBootState = useCallback((nextState: BootState) => {
    bootStateRef.current = nextState;
    setBootState(nextState);
  }, []);

  const applySnapshot = useCallback(
    (snapshot: Awaited<ReturnType<typeof loadCachedExhibition>>) => {
      if (!snapshot) return;
      setManifest(snapshot.manifest);
      queryClient.setQueryData(["images"], snapshot.media);
    },
    [queryClient],
  );

  const runInitialSync = useCallback(async () => {
    updateBootState("syncing");
    setErrorMessage("");
    setProgress(initialProgress);

    try {
      const snapshot = await syncExhibitionAssets(setProgress);
      applySnapshot(snapshot);
      updateBootState("ready");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      updateBootState("error");
    }
  }, [applySnapshot, updateBootState]);

  useEffect(() => {
    if (!isCapacitorBundle || !isNativeExhibitionApp()) {
      updateBootState("ready");
      return;
    }

    let cancelled = false;

    void Promise.all([
      SystemBars.setStyle({ style: SystemBarsStyle.Dark }),
      SystemBars.hide(),
    ]).catch(() => undefined);

    void loadCachedExhibition().then((snapshot) => {
      if (cancelled) return;
      if (snapshot) {
        applySnapshot(snapshot);
        updateBootState("ready");
        return;
      }
      void runInitialSync();
    });

    return () => {
      cancelled = true;
    };
  }, [applySnapshot, runInitialSync, updateBootState]);

  useEffect(() => {
    if (!isNativeExhibitionApp()) return;

    const listener = App.addListener("backButton", () => {
      if (bootStateRef.current !== "ready") return;

      const backEvent = new CustomEvent(ANDROID_BACK_EVENT, {
        cancelable: true,
      });
      window.dispatchEvent(backEvent);
      if (backEvent.defaultPrevented) return;

      if (adminOpenRef.current) {
        setIsAdminOpen(false);
        adminOpenRef.current = false;
        return;
      }

      if (pathnameRef.current.startsWith("/gallery")) {
        window.sessionStorage.setItem(RESTORE_ALBUM_SECTION_KEY, "true");
        router.replace("/");
      }
      // Home intentionally ignores back so visitors cannot leave the exhibit.
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, [router]);

  useEffect(() => {
    if (!isNativeExhibitionApp()) return;

    void Network.getStatus().then((status) => setIsConnected(status.connected));
    const listener = Network.addListener("networkStatusChange", (status) => {
      setIsConnected(status.connected);
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, []);

  const handleAdminTrigger = () => {
    tapCountRef.current += 1;
    if (tapResetRef.current) window.clearTimeout(tapResetRef.current);

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      setIsAdminOpen(true);
      adminOpenRef.current = true;
      return;
    }

    tapResetRef.current = window.setTimeout(() => {
      tapCountRef.current = 0;
    }, 2_000);
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
    adminOpenRef.current = false;
  };

  const runManualSync = async () => {
    setIsManualSyncing(true);
    setErrorMessage("");
    setProgress(initialProgress);

    try {
      const snapshot = await syncExhibitionAssets(setProgress);
      applySnapshot(snapshot);
      await queryClient.invalidateQueries({ queryKey: ["images"] });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsManualSyncing(false);
    }
  };

  if (bootState !== "ready") {
    const ratio = progress.total > 0 ? progress.completed / progress.total : 0;

    return (
      <main className="flex min-h-dvh w-full items-center justify-center bg-black px-8 text-white">
        <section className="w-full max-w-xl text-center" aria-live="polite">
          <p className="mb-5 font-mono text-sm tracking-[0.35em] text-white/55">
            KIMGUPALL EXHIBITION
          </p>
          <h1 className="text-3xl font-black md:text-5xl">전시 데이터를 준비하고 있습니다</h1>
          <p className="mt-6 font-mono text-base text-white/70">
            {bootState === "error" ? errorMessage : progress.label}
          </p>
          {bootState !== "error" ? (
            <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full bg-white transition-[width] duration-300"
                style={{ width: `${Math.max(ratio * 100, progress.total ? 2 : 12)}%` }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void runInitialSync()}
              className="mt-8 rounded-full border border-white bg-white px-10 py-3 font-mono text-lg font-bold text-black active:scale-95"
            >
              다시 시도
            </button>
          )}
        </section>
      </main>
    );
  }

  return (
    <>
      {children}
      {isCapacitorBundle ? (
        <button
          type="button"
          aria-label="전시 관리자 열기"
          onClick={handleAdminTrigger}
          className="fixed left-0 top-0 z-[70] h-16 w-16 bg-transparent text-transparent"
        >
          관리자
        </button>
      ) : null}
      {isAdminOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exhibition-admin-title"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-6 text-white"
        >
          <section className="w-full max-w-xl rounded-2xl border border-white/20 bg-black p-7 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h2 id="exhibition-admin-title" className="text-2xl font-black">
                전시 관리자
              </h2>
              <button
                type="button"
                onClick={closeAdmin}
                className="rounded-full border border-white px-5 py-2 font-mono"
              >
                CLOSE
              </button>
            </div>
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm">
              <dt className="text-white/50">네트워크</dt>
              <dd>{isConnected === null ? "확인 중" : isConnected ? "연결됨" : "오프라인"}</dd>
              <dt className="text-white/50">미디어</dt>
              <dd>{manifest?.mediaCount ?? 0}개</dd>
              <dt className="text-white/50">캐시 이미지</dt>
              <dd>{manifest?.assets.length ?? 0}개</dd>
              <dt className="text-white/50">마지막 동기화</dt>
              <dd>{manifest ? new Date(manifest.syncedAt).toLocaleString("ko-KR") : "없음"}</dd>
              <dt className="text-white/50">캐시 버전</dt>
              <dd className="break-all font-mono text-xs">{manifest?.version ?? "없음"}</dd>
            </dl>
            {isManualSyncing ? (
              <p className="mt-7 font-mono text-sm text-white/70">{progress.label}</p>
            ) : null}
            {errorMessage ? (
              <p className="mt-5 text-sm text-red-300">{errorMessage}</p>
            ) : null}
            <button
              type="button"
              disabled={isManualSyncing || isConnected === false}
              onClick={() => void runManualSync()}
              className="mt-8 w-full rounded-full bg-white px-8 py-3 font-mono text-lg font-bold text-black disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.99]"
            >
              {isManualSyncing ? "다운로드 중" : "전시 데이터 다시 다운로드"}
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
