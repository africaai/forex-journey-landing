import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface SignUpFormProps {
  onSuccess: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
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
      deviceId: generateDeviceId(), // Generate unique device identifier
    };

    // Here you would typically make an API call to register the user
    // For demonstration, we'll simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      // Store the session token and device ID
      localStorage.setItem("sessionToken", generateSessionToken());
      localStorage.setItem("deviceId", data.deviceId);
      
      toast({
        title: "Successfully registered!",
        description: "Welcome to the course. Redirecting you to the learning platform...",
      });
      onSuccess();
    }, 1500);
  };

  // Generate a unique device identifier
  const generateDeviceId = () => {
    const existingId = localStorage.getItem("deviceId");
    if (existingId) return existingId;
    
    const newId = crypto.randomUUID();
    return newId;
  };

  // Generate a session token
  const generateSessionToken = () => {
    return crypto.randomUUID();
  };

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
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
      <p className="text-sm text-gray-500 text-center">
        By signing up, you agree to our terms of service which prohibit sharing accounts.
        Multiple concurrent logins will result in account suspension.
      </p>
    </form>
  );
}