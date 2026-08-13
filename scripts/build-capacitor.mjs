import { cp, mkdir, rm, symlink } from "node:fs/promises";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const buildRoot = join(projectRoot, ".capacitor-build");

const copyEntries = [
  "src",
  "public",
  "package.json",
  "next.config.ts",
  "postcss.config.mjs",
  "tailwind.config.ts",
  "tsconfig.json",
  "next-env.d.ts",
];

await rm(buildRoot, { recursive: true, force: true });
await mkdir(buildRoot, { recursive: true });

for (const entry of copyEntries) {
  await cp(join(projectRoot, entry), join(buildRoot, entry), {
    recursive: true,
  });
}

// The APK has no Next.js runtime. The web API remains in the main build and
// the mobile bundle talks to its absolute production URL when synchronizing.
await rm(join(buildRoot, "src/app/api"), { recursive: true, force: true });
await symlink(
  join(projectRoot, "node_modules"),
  join(buildRoot, "node_modules"),
  "dir",
);

const nextBin = join(projectRoot, "node_modules/next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  cwd: buildRoot,
  env: {
    ...process.env,
    CAPACITOR_BUILD: "1",
    NEXT_PUBLIC_CAPACITOR_BUILD: "1",
  },
  stdio: "inherit",
});

const exitCode = await new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", (code) => resolve(code ?? 1));
});

if (exitCode !== 0) {
  process.exitCode = exitCode;
}
