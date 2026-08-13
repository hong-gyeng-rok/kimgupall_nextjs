import { Capacitor } from "@capacitor/core";

export const isNativeExhibitionApp = () => Capacitor.isNativePlatform();
