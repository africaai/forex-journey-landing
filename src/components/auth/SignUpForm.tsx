import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SignUpFormProps {
  onSuccess: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      deviceId: generateDeviceId(),
      tradingExperience: formData.get("tradingExperience"),
      preferredMarket: formData.get("preferredMarket"),
      learningGoal: formData.get("learningGoal"),
      availableTime: formData.get("availableTime"),
    };

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("sessionToken", generateSessionToken());
      localStorage.setItem("deviceId", data.deviceId);
      localStorage.setItem("userPreferences", JSON.stringify({
        tradingExperience: data.tradingExperience,
        preferredMarket: data.preferredMarket,
        learningGoal: data.learningGoal,
        availableTime: data.availableTime,
      }));
      
      toast({
        title: "Successfully registered!",
        description: "Welcome to the course. We've customized your learning path based on your preferences.",
      });
      onSuccess();
    }, 1500);
  };

  const generateDeviceId = () => {
    const existingId = localStorage.getItem("deviceId");
    if (existingId) return existingId;
    return crypto.randomUUID();
  };

  const generateSessionToken = () => {
    return crypto.randomUUID();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (step === 1) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>What's your trading experience?</Label>
          <RadioGroup defaultValue="beginner" name="tradingExperience" className="grid gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner">Complete beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="some-knowledge" id="some-knowledge" />
              <Label htmlFor="some-knowledge">Some knowledge but haven't traded</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="traded-before" id="traded-before" />
              <Label htmlFor="traded-before">Have traded before</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>What's your primary goal?</Label>
          <Select name="learningGoal">
            <SelectTrigger>
              <SelectValue placeholder="Select your main goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Become a full-time trader</SelectItem>
              <SelectItem value="part-time">Generate part-time income</SelectItem>
              <SelectItem value="learn">Learn about financial markets</SelectItem>
              <SelectItem value="improve">Improve existing trading skills</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={nextStep} className="w-full">Continue</Button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Which market interests you most?</Label>
          <Select name="preferredMarket">
            <SelectTrigger>
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forex">Forex</SelectItem>
              <SelectItem value="stocks">Stocks</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="commodities">Commodities</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>How much time can you dedicate to learning?</Label>
          <Select name="availableTime">
            <SelectTrigger>
              <SelectValue placeholder="Select time commitment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 hours per week</SelectItem>
              <SelectItem value="3-5">3-5 hours per week</SelectItem>
              <SelectItem value="5-10">5-10 hours per week</SelectItem>
              <SelectItem value="10+">10+ hours per week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={prevStep} variant="outline" className="w-full">Back</Button>
          <Button type="button" onClick={nextStep} className="w-full">Continue</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" required placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" required placeholder="+254 700 000000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          required 
          placeholder="••••••••"
          minLength={8}
        />
        <p className="text-sm text-gray-500">
          Password must be at least 8 characters long
        </p>
      </div>
      <div className="flex gap-2">
        <Button type="button" onClick={prevStep} variant="outline" className="w-full">Back</Button>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Complete Sign Up"}
        </Button>
      </div>
      <p className="text-sm text-gray-500 text-center">
        By signing up, you agree to our terms of service which prohibit sharing accounts.
        Multiple concurrent logins will result in account suspension.
      </p>
    </form>
  );
}