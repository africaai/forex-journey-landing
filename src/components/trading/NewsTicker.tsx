import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [news.length]);

  if (isLoading || !news.length) {
    return null;
  }

  return (
    <div className="w-full bg-background border rounded-lg p-2 mb-4">
      <ScrollArea className="h-12 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNewsIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-primary font-medium"
          >
            {news[currentNewsIndex]}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default NewsTicker;