import { LineChart, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const DailyCharts = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Daily Chart Analysis
          </h2>
          <p className="text-xl text-gray-600">
            Get professional chart analysis and trading setups every day
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Technical Analysis",
              description: "Detailed chart patterns and indicators analysis",
              icon: LineChart,
            },
            {
              title: "Entry Points",
              description: "Precise entry and exit levels for trades",
              icon: TrendingUp,
            },
            {
              title: "Market Overview",
              description: "Daily market sentiment and trend analysis",
              icon: Eye,
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Button variant="outline">Learn More</Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DailyCharts;