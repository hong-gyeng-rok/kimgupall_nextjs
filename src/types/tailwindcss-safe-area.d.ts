declare module "tailwindcss-safe-area" {
  const plugin: ReturnType<typeof import("tailwindcss/plugin").default>;
  export default plugin;
}
