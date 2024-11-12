import Hero from "@/components/landing/Hero";
import Authority from "@/components/landing/Authority";
import Benefits from "@/components/landing/Benefits";
import ProgramDetails from "@/components/landing/ProgramDetails";
import FAQ from "@/components/landing/FAQ";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Authority />
      <Benefits />
      <ProgramDetails />
      <FAQ />
    </main>
  );
};

export default Index;