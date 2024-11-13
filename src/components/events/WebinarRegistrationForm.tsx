import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TIMEZONES = [
  { value: "EAT", label: "East Africa Time" },
  { value: "GMT", label: "Greenwich Mean Time" },
  { value: "EST", label: "Eastern Standard Time" },
  { value: "PST", label: "Pacific Standard Time" },
];

export function WebinarRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      timezone: formData.get("timezone"),
      webinarId: crypto.randomUUID(),
      registrationDate: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://hook.eu2.make.com/8pqd5dv7mt5eko4657yw3lanaj4cgaxm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Registration failed');

      toast({
        title: "Successfully registered!",
        description: "You will receive an email with the webinar details shortly.",
      });

      // Store registration in localStorage for persistence
      const registrations = JSON.parse(localStorage.getItem("webinarRegistrations") || "[]");
      registrations.push(data);
      localStorage.setItem("webinarRegistrations", JSON.stringify(registrations));
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register for Webinar</CardTitle>
        <CardDescription>Join our live trading session with expert analysts</CardDescription>
      </CardHeader>
      <CardContent>
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
            <Label htmlFor="timezone">Your Timezone</Label>
            <Select name="timezone" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}