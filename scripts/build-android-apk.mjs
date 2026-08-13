import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const isRelease = process.argv.includes("--release");

const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: process.env,
      stdio: "inherit",
      ...options,
    });
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)),
    );
  });

await run("npm", ["run", "android:sync"]);

const homebrewJavaHome =
  "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home";
const homebrewAndroidHome = "/opt/homebrew/share/android-commandlinetools";
const javaHome =
  process.env.JAVA_HOME ?? (existsSync(homebrewJavaHome) ? homebrewJavaHome : "");
const androidHome =
  process.env.ANDROID_HOME ??
  process.env.ANDROID_SDK_ROOT ??
  (existsSync(homebrewAndroidHome) ? homebrewAndroidHome : "");

if (!javaHome || !androidHome) {
  throw new Error(
    "JDK 21 또는 Android SDK를 찾지 못했습니다. JAVA_HOME과 ANDROID_HOME을 설정해 주세요.",
  );
}

if (isRelease && !process.env.KIMGUPALL_KEYSTORE_PATH) {
  throw new Error(
    "릴리스 APK에는 KIMGUPALL_KEYSTORE_PATH 등 서명 환경변수가 필요합니다.",
  );
}

await run(
  join(projectRoot, "android/gradlew"),
  [isRelease ? "assembleRelease" : "assembleDebug"],
  {
    cwd: join(projectRoot, "android"),
    env: {
      ...process.env,
      JAVA_HOME: javaHome,
      ANDROID_HOME: androidHome,
      ANDROID_SDK_ROOT: androidHome,
    },
  },
);
