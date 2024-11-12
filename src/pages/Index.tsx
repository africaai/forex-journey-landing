import Hero from "@/components/landing/Hero";
import Authority from "@/components/landing/Authority";
import Benefits from "@/components/landing/Benefits";
import ProgramDetails from "@/components/landing/ProgramDetails";
import FAQ from "@/components/landing/FAQ";
import SocialProof from "@/components/landing/SocialProof";
import Chatbot from "@/components/landing/Chatbot";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Authority />
      <Benefits />
      <ProgramDetails />
      <SocialProof />
      <FAQ />
      <Chatbot />
    </main>
  );
};

export default Index;