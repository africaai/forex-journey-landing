import { useState } from "react";
import { GraduationCap, ChartBar, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    description: "Learn the Basics, Avoid Common Mistakes",
    icon: GraduationCap,
    benefits: [
      "Understanding Forex fundamentals",
      "Basic chart analysis",
      "Risk management essentials",
      "Demo trading practice",
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Refine Strategies, Build Consistency",
    icon: ChartBar,
    benefits: [
      "Advanced technical analysis",
      "Multiple timeframe trading",
      "Position sizing strategies",
      "Real account management",
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Master Complex Trades, Manage High-Risk Investments",
    icon: Brain,
    benefits: [
      "Complex trading strategies",
      "Portfolio management",
      "Automated trading systems",
      "Market psychology mastery",
    ],
  },
];

const Benefits = () => {
  const [activeLevel, setActiveLevel] = useState("beginner");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Designed for Every Step of Your Journey
          </h2>
          <p className="text-xl text-gray-600">
            Choose your level and start your forex trading journey today
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {levels.map((level) => {
            const Icon = level.icon;
            return (
              <div
                key={level.id}
                className={cn(
                  "relative p-8 rounded-xl transition-all duration-300 cursor-pointer",
                  activeLevel === level.id
                    ? "bg-primary text-white shadow-xl scale-105"
                    : "bg-white hover:shadow-lg"
                )}
                onClick={() => setActiveLevel(level.id)}
              >
                <Icon
                  className={cn(
                    "h-12 w-12 mb-6",
                    activeLevel === level.id ? "text-accent" : "text-primary"
                  )}
                />
                <h3 className="text-2xl font-bold mb-4">{level.title}</h3>
                <p
                  className={cn(
                    "mb-6",
                    activeLevel === level.id ? "text-white/90" : "text-gray-600"
                  )}
                >
                  {level.description}
                </p>
                <ul className="space-y-3">
                  {level.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className={cn(
                        "flex items-center space-x-2",
                        activeLevel === level.id
                          ? "text-white/90"
                          : "text-gray-600"
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;