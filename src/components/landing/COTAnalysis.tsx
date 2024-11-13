import { BarChart, PieChart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const COTAnalysis = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Commitment of Traders (COT) Analysis
          </h2>
          <p className="text-xl text-gray-600">
            Understanding institutional positioning in the forex market
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Weekly Reports",
              description: "Regular updates on institutional positions",
              icon: BarChart,
            },
            {
              title: "Position Analysis",
              description: "Detailed breakdown of market positioning",
              icon: PieChart,
            },
            {
              title: "Trend Forecasting",
              description: "Future market direction predictions",
              icon: LineChart,
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
                <Button variant="outline">View Reports</Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default COTAnalysis;