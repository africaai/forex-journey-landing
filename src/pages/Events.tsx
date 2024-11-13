import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { WebinarRegistrationForm } from "@/components/events/WebinarRegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video, Users, PlayCircle } from "lucide-react";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = [
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
  ];

  const pastEvents = [
    {
      title: "Market Analysis Masterclass",
      date: "March 15, 2024",
      description: "Learn advanced market analysis techniques",
      recordingUrl: "#",
      icon: PlayCircle,
    },
    {
      title: "Trading Psychology Workshop",
      date: "March 1, 2024",
      description: "Understanding the mindset of successful traders",
      recordingUrl: "#",
      icon: PlayCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Events & Webinars</h1>
        
        <Tabs defaultValue="upcoming" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Register Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <WebinarRegistrationForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => {
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
                    <Button variant="outline">
                      Watch Recording
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;