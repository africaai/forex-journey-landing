import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, Globe, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

const NewsTicker = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const { toast } = useToast();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ['forex-news'],
    queryFn: async () => {
      try {
        const currentDate = new Date().toLocaleString();
        const completion = await openai.chat.completions.create({
          model: "grok-beta",
          messages: [
            {
              role: "system",
              content: `You are a financial news analyst Current date and time ${currentDate} Provide only the latest forex market headlines in plain text format without any punctuation or additional context Focus on major currency pairs and significant market events from the last few hours`
            },
            {
              role: "user",
              content: `As of ${currentDate} what are the most recent forex market headlines Provide exactly 5 headlines focusing on events from the last few hours Format as plain text without punctuation or additional context`
            }
          ]
        });

        const newsText = completion.choices[0].message.content || '';
        return newsText.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.\s*/, ''));
      } catch (error: any) {
        if (error?.status === 429) {
          toast({
            title: "Rate limit reached",
            description: "News updates will resume shortly",
            variant: "destructive",
          });
        }
        throw error;
      }
    },
    retry: (failureCount, error: any) => {
      if (error?.status === 429) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: 300000, // Increased to 5 minutes to avoid rate limits
    staleTime: 240000, // Cache data for 4 minutes
  });

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % news.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [news.length]);

  if (isLoading || !news.length) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground animate-pulse p-4">
        <Globe className="h-4 w-4" />
        <span>Loading market updates...</span>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">LIVE MARKET UPDATES</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updates every 5m</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNewsIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ 
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1]
          }}
          className="py-2"
        >
          <div className="flex flex-col gap-1">
            <motion.div
              className="text-lg font-medium text-foreground flex items-center gap-2"
              layout
            >
              <ArrowRight className="h-5 w-5 text-primary" />
              {news[currentNewsIndex]}
            </motion.div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-1">
                {news.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                      idx === currentNewsIndex ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NewsTicker;