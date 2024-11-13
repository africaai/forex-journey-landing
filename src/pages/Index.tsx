import Hero from "@/components/landing/Hero";
import Authority from "@/components/landing/Authority";
import Benefits from "@/components/landing/Benefits";
import ProgramDetails from "@/components/landing/ProgramDetails";
import DailyCharts from "@/components/landing/DailyCharts";
import COTAnalysis from "@/components/landing/COTAnalysis";
import Events from "@/components/landing/Events";
import Blog from "@/components/landing/Blog";
import Membership from "@/components/landing/Membership";
import Partners from "@/components/landing/Partners";
import Contact from "@/components/landing/Contact";
import FAQ from "@/components/landing/FAQ";
import Chatbot from "@/components/landing/Chatbot";
import PricePredictor from "@/components/trading/PricePredictor";
import SocialProof from "@/components/landing/SocialProof";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="py-12 bg-gray-50">
        <PricePredictor />
      </div>
      <Authority />
      <DailyCharts />
      <COTAnalysis />
      <Benefits />
      <ProgramDetails />
      <Events />
      <Blog />
      <Membership />
      <Partners />
      <SocialProof />
      <Contact />
      <FAQ />
      <Chatbot />
    </main>
  );
};

export default Index;