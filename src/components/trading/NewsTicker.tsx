import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, Clock } from 'lucide-react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

const NewsTicker = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const { data: news = [], isLoading } = useQuery({
    queryKey: ['forex-news'],
    queryFn: async () => {
      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "You are a financial news analyst. Provide the latest forex market news and developments that could impact currency trading. Focus on major currency pairs and significant market events."
          },
          {
            role: "user",
            content: "What are the latest forex market news headlines? Provide 5 recent, impactful headlines with brief descriptions."
          }
        ]
      });

      const newsText = completion.choices[0].message.content || '';
      return newsText.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, ''));
    },
    refetchInterval: 300000 // Refetch every 5 minutes
  });

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % news.length);
      }, 8000); // Increased duration for better readability
      return () => clearInterval(interval);
    }
  }, [news.length]);

  if (isLoading || !news.length) {
    return (
      <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
          <TrendingUp className="h-4 w-4" />
          <span>Loading market updates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">MARKET UPDATES</span>
        <div className="flex-1 border-t border-border/50 mx-2" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updates every 5m</span>
        </div>
      </div>
      <ScrollArea className="h-16 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNewsIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="py-1"
          >
            <div className="flex flex-col gap-1">
              <motion.div
                className="text-sm font-medium text-foreground"
                layout
              >
                {news[currentNewsIndex]}
              </motion.div>
              <div className="flex items-center gap-2">
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
      </ScrollArea>
    </div>
  );
};

export default NewsTicker;