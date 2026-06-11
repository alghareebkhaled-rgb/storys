import SkyBackground from "../components/SkyBackground";
import StoryGenerator from "../components/StoryGenerator";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <SkyBackground />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-10 sm:px-6 md:py-14">
        <StoryGenerator />
      </div>
    </main>
  );
}
