import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreviewDialog({ open, onOpenChange }: PreviewDialogProps) {
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  
  const previewVideos = [
    {
      title: "Introduction to Forex",
      duration: "2:30",
      description: "A quick overview of what forex trading is and how it works."
    },
    {
      title: "Basic Chart Reading",
      duration: "3:15",
      description: "Learn the fundamentals of reading forex charts and identifying trends."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Free Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-80" />
          </div>
          <div className="space-y-4">
            {previewVideos.map((video, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  currentVideo === index ? "bg-primary/5 border-primary" : "hover:bg-gray-50"
                }`}
                onClick={() => setCurrentVideo(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{video.title}</h3>
                    <p className="text-sm text-gray-500">{video.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Start Learning Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}