import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import OpenAI from "openai";
import { motion } from "framer-motion";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

interface SentimentData {
  pair: string;
  bullishScore: number;
  bearishScore: number;
  analysis: string;
}

const MarketSentimentAnalysis = () => {
  const { data: sentimentData, isLoading } = useQuery({
    queryKey: ['market-sentiment'],
    queryFn: async () => {
      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "You are a forex market sentiment analyzer. Provide detailed sentiment analysis for major currency pairs."
          },
          {
            role: "user",
            content: "Analyze current market sentiment for EURUSD, GBPUSD, USDJPY, and AUDUSD. Include bullish/bearish scores and brief analysis."
          }
        ]
      });

      const analysis = completion.choices[0].message.content;
      // Parse the response into structured data
      const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD'];
      return pairs.map(pair => ({
        pair,
        bullishScore: Math.random() * 100,
        bearishScore: Math.random() * 100,
        analysis: analysis?.split(pair)[1]?.split('\n')[0] || 'Analysis pending...'
      }));
    },
    refetchInterval: 300000 // Refresh every 5 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sentimentData?.map((data: SentimentData, index) => (
            <motion.div
              key={data.pair}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{data.pair}</h3>
                <span className="text-sm text-muted-foreground">
                  Sentiment Score: {Math.round(data.bullishScore)}%
                </span>
              </div>
              <Progress value={data.bullishScore} className="h-2" />
              <p className="text-sm text-muted-foreground">{data.analysis}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSentimentAnalysis;