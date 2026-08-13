import HomeView from "@/components/home/HomeView";
import PageShell from "@/components/layout/PageShell";

export default async function Home() {
  return (
    <PageShell testId="HomePage">
      <HomeView />
    </PageShell>
  );
}
