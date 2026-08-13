import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kimgupall.exhibition",
  appName: "KIMGUPALL Exhibition",
  webDir: ".capacitor-build/out",
  backgroundColor: "#000000",
  android: {
    allowMixedContent: false,
    backgroundColor: "#000000",
  },
};

export default config;
