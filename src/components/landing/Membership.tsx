import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Membership = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Premium Membership</h2>
          <p className="text-xl text-white/90">
            Take your trading to the next level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Basic",
              price: "Free",
              features: [
                "Daily market analysis",
                "Basic chart setups",
                "Community access",
                "Educational resources",
              ],
            },
            {
              title: "Pro",
              price: "$99/month",
              features: [
                "All Basic features",
                "Live trading signals",
                "Weekly webinars",
                "Priority support",
                "Advanced indicators",
              ],
              featured: true,
            },
            {
              title: "Elite",
              price: "$199/month",
              features: [
                "All Pro features",
                "1-on-1 mentoring",
                "Custom indicators",
                "Private Discord group",
                "Trading algorithms",
              ],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 ${
                plan.featured
                  ? "bg-accent text-black scale-105 shadow-xl"
                  : "bg-white/10 backdrop-blur-sm"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center space-x-2">
                    <Check className="h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.featured ? "bg-black text-white hover:bg-gray-900" : ""
                }`}
                variant={plan.featured ? "default" : "outline"}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;