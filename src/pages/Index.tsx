import Hero from "@/components/landing/Hero";
import Authority from "@/components/landing/Authority";
import Benefits from "@/components/landing/Benefits";
import ProgramDetails from "@/components/landing/ProgramDetails";
import FAQ from "@/components/landing/FAQ";
import SocialProof from "@/components/landing/SocialProof";
import Chatbot from "@/components/landing/Chatbot";
import PricePredictor from "@/components/trading/PricePredictor";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="py-12 bg-gray-50">
        <PricePredictor />
      </div>
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