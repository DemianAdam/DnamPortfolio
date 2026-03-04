import { AboutSection } from "./_components/AboutSection";
import { HeroSection } from "./_components/HeroSection";
import { Navbar } from "./_components/Navbar";

export default function HomePage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 ">
        <div className="absolute -top-50 left-1/2 -translate-x-1/2 h-125 w-200 bg-brand-primary/10 blur-[120px] rounded-full" />
      </div>
      <Navbar />
      <HeroSection />
      <AboutSection />
    </>
  );
}