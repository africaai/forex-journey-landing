import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { PreviewDialog } from "@/components/landing/PreviewDialog";

const Hero = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-light">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-background-shine" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Your Forex Journey Begins Here
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Master Forex Trading with Dennis Okari – From Beginner to Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent-light text-black font-semibold"
              onClick={() => setShowSignUp(true)}
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              onClick={() => setShowPreview(true)}
            >
              Free Sneak Peek
            </Button>
          </div>
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
            <p className="text-white/90">Trusted by 1000+ Traders Worldwide</p>
          </div>
        </div>
      </div>

      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign Up to Start Learning</DialogTitle>
          </DialogHeader>
          <SignUpForm onSuccess={() => {
            setShowSignUp(false);
            window.location.href = "/courses";
          }} />
        </DialogContent>
      </Dialog>

      <PreviewDialog open={showPreview} onOpenChange={setShowPreview} />
    </div>
  );
};

export default Hero;
