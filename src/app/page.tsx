import HomeView from "@/components/home/HomeView";
import PageShell from "@/components/layout/PageShell";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <PageShell testId="HomePage">
      <HomeView />
    </PageShell>
  );
}
