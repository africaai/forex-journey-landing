import { Calendar, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600">
            Join our live webinars and trading seminars
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Weekly Webinars",
              date: "Every Wednesday",
              description: "Live market analysis and Q&A sessions",
              icon: Video,
            },
            {
              title: "Monthly Masterclass",
              date: "Last Saturday",
              description: "Deep dive into advanced trading strategies",
              icon: Users,
            },
            {
              title: "Special Events",
              date: "Quarterly",
              description: "Guest speakers and networking opportunities",
              icon: Calendar,
            },
          ].map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                <p className="text-accent font-semibold mb-4">{event.date}</p>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Button>Register Now</Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;