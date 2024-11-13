import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import OpenAI from "openai";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];

const TechnicalAnalysis = () => {
  const { toast } = useToast();
  
  const { data: analysis, isLoading, error } = useQuery({
    queryKey: ['technical-analysis'],
    queryFn: async () => {
      try {
        const completion = await openai.chat.completions.create({
          model: "grok-beta",
          messages: [
            {
              role: "system",
              content: "You are a technical analysis expert. Provide brief, clear analysis for major tech stocks. Do not use asterisks or bullet points in your response."
            },
            {
              role: "user",
              content: `Analyze ${STOCK_SYMBOLS.join(', ')} with key metrics. Provide a concise summary for each stock.`
            }
          ]
        });

        return {
          stocks: STOCK_SYMBOLS.map(symbol => ({
            symbol,
            price: Math.random() * 1000 + 100,
            trend: Math.random() > 0.5 ? "bullish" : "bearish",
            volume: Math.floor(Math.random() * 1000000)
          })),
          analysis: completion.choices[0].message.content
        };
      } catch (error: any) {
        if (error?.status === 429) {
          toast({
            title: "Rate limit reached",
            description: "Please try again in a few minutes",
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
    refetchInterval: 1200000,
    staleTime: 1140000,
  });

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6 text-destructive">
          Unable to load analysis. Please try again later.
        </CardContent>
      </Card>
    );
  }

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {analysis?.stocks.map((stock) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">{stock.symbol}</span>
                  <Badge variant={stock.trend === "bullish" ? "default" : "destructive"}>
                    {stock.trend}
                  </Badge>
                </div>
                <p className="text-lg font-mono">${stock.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  Vol: {(stock.volume / 1000).toFixed(1)}K
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-200">
            {analysis?.analysis}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TechnicalAnalysis;