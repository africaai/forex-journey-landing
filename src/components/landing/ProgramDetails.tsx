import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Video, Users, ChartLine } from "lucide-react";

const modules = [
  {
    id: "foundation",
    title: "Foundation",
    description: "Master the fundamentals of forex trading",
    features: [
      "Introduction to forex markets",
      "Basic technical analysis",
      "Risk management principles",
    ],
    icon: BookOpen,
  },
  {
    id: "basics",
    title: "Forex Basics",
    description: "Understanding currency pairs and market dynamics",
    features: [
      "Currency pair analysis",
      "Market sessions and timing",
      "Basic trading strategies",
    ],
    icon: ChartLine,
  },
  {
    id: "strategy",
    title: "Advanced Strategy",
    description: "Develop your trading edge",
    features: [
      "Advanced technical analysis",
      "Multiple timeframe trading",
      "Position sizing strategies",
    ],
    icon: Video,
  },
  {
    id: "community",
    title: "Trading Community",
    description: "Learn and grow with fellow traders",
    features: [
      "Live trading sessions",
      "Community discussion forums",
      "Weekly market analysis",
    ],
    icon: Users,
  },
];

const ProgramDetails = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Path to Pro-Level Trading
          </h2>
          <p className="text-xl text-gray-600">
            A comprehensive curriculum designed for your success
          </p>
        </div>

        <Tabs defaultValue="foundation" className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-8">
            {modules.map((module) => (
              <TabsTrigger
                key={module.id}
                value={module.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {module.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <TabsContent key={module.id} value={module.id}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{module.description}</p>
                        <ul className="space-y-2">
                          {module.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ProgramDetails;