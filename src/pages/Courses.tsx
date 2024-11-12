import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, FileCheck } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const courseModules = [
  {
    title: "Program Introduction",
    lessons: [
      { title: "Welcome to the course!", duration: "14:07" },
      { title: "About the Instructor", duration: "4:44" },
      { title: "The Deliverables", duration: "6:27" },
      { title: "Getting Started", duration: "14:37" },
      { title: "Why trade FOREX?", duration: "30:33" },
      { title: "Take Quiz", duration: null },
    ]
  },
  {
    title: "Week One - The Foundation",
    lessons: [
      { title: "The 'F' Word", duration: "12:44" },
      { title: "Definition of Insanity", duration: "4:00" },
      { title: "What is Money?", duration: "18:09" },
      { title: "The Most Important RULE in Investing", duration: "8:50" },
      { title: "Take Quiz", duration: null },
    ]
  },
  // ... Add more weeks as needed
];

const Courses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for valid session
    const sessionToken = localStorage.getItem("sessionToken");
    const deviceId = localStorage.getItem("deviceId");
    
    if (!sessionToken || !deviceId) {
      toast({
        title: "Session expired",
        description: "Please sign in again to continue learning",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Here you would typically validate the session with your backend
    // For now, we'll just check if the device ID matches
    const currentDeviceId = crypto.randomUUID();
    if (deviceId !== localStorage.getItem("deviceId")) {
      toast({
        title: "Account in use",
        description: "This account is already being used on another device",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Course Content</h1>
        <div className="space-y-6">
          {courseModules.map((module, moduleIndex) => (
            <Card key={moduleIndex}>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        {lesson.duration ? (
                          <Play className="h-5 w-5 text-primary" />
                        ) : (
                          <FileCheck className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          {lesson.duration && (
                            <p className="text-sm text-gray-500">{lesson.duration}</p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline">Start</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
