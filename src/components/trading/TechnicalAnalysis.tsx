import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import OpenAI from "openai";
import { motion } from "framer-motion";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

interface TechnicalIndicator {
  name: string;
  value: string;
  signal: "buy" | "sell" | "neutral";
}

const TechnicalAnalysis = () => {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ['technical-analysis'],
    queryFn: async () => {
      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "You are a technical analysis expert. Provide detailed technical analysis for forex pairs."
          },
          {
            role: "user",
            content: "Analyze EURUSD using key technical indicators (RSI, MACD, Moving Averages) and provide support/resistance levels."
          }
        ]
      });

      const analysisText = completion.choices[0].message.content;
      return {
        indicators: [
          { name: "RSI", value: "65.5", signal: "buy" },
          { name: "MACD", value: "0.0023", signal: "sell" },
          { name: "MA(200)", value: "1.0950", signal: "neutral" }
        ] as TechnicalIndicator[],
        analysis: analysisText,
        levels: {
          support: [1.0850, 1.0800],
          resistance: [1.0950, 1.1000]
        }
      };
    },
    refetchInterval: 60000 // Refresh every minute
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
        <CardTitle>Technical Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-3 gap-4">
            {analysis?.indicators.map((indicator, index) => (
              <motion.div
                key={indicator.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{indicator.name}</span>
                  <Badge variant={
                    indicator.signal === "buy" ? "default" :
                    indicator.signal === "sell" ? "destructive" : "secondary"
                  }>
                    {indicator.signal.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-2xl font-mono mt-2">{indicator.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <h4 className="font-medium mb-2">Support Levels</h4>
                <div className="space-y-2">
                  {analysis?.levels.support.map((level, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="font-mono">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Resistance Levels</h4>
                <div className="space-y-2">
                  {analysis?.levels.resistance.map((level, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-mono">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {analysis?.analysis}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TechnicalAnalysis;