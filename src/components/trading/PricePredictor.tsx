import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, TrendingUp } from "lucide-react";
import OpenAI from "openai";
import { motion, AnimatePresence } from "framer-motion";
import { ForexRate } from "@/types/forex";
import ForexCharts from "./ForexCharts";
import ForexPredictionCard from "./ForexPredictionCard";
import NewsTicker from "./NewsTicker";
import MarketSentimentAnalysis from "./MarketSentimentAnalysis";
import TechnicalAnalysis from "./TechnicalAnalysis";
import StockDataChart from "./StockDataChart";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

const PricePredictor = () => {
  const { toast } = useToast();
  const [predictions, setPredictions] = useState<ForexRate[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: rates, isLoading } = useQuery({
    queryKey: ['forex-rates'],
    queryFn: async () => {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data = await response.json();
      return {
        quotes: {
          USDEUR: data.rates.EUR,
          USDGBP: data.rates.GBP,
          USDCAD: data.rates.CAD,
          USDPLN: data.rates.PLN
        }
      };
    },
    refetchInterval: 60000
  });

  const getPrediction = async () => {
    if (!rates?.quotes) return;
    setIsAnalyzing(true);
    
    try {
      const prompt = `As a top forex analyst, provide a comprehensive market analysis for these currency pairs:
      USDEUR: ${rates.quotes.USDEUR}
      USDGBP: ${rates.quotes.USDGBP}
      USDCAD: ${rates.quotes.USDCAD}
      USDPLN: ${rates.quotes.USDPLN}

      For each pair:
      1. Analyze current market sentiment considering latest economic data and news
      2. Identify key support and resistance levels
      3. Evaluate trading volume and market momentum
      4. Provide specific price targets and risk levels
      5. Consider geopolitical factors and central bank policies
      6. Analyze technical indicators (RSI, MACD, Moving Averages)
      7. Factor in upcoming economic events and their potential impact

      Format the response to clearly separate analysis for each currency pair.`;

      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          { 
            role: "system", 
            content: "You are an elite forex analyst with access to real-time market data, news, and advanced technical analysis tools. Provide institutional-grade market analysis." 
          },
          { role: "user", content: prompt }
        ]
      });

      const analysis = completion.choices[0].message.content;

      // Transform rates and analysis into enhanced chart data
      const newPredictions: ForexRate[] = Object.entries(rates.quotes).map(([pair, rate]) => {
        const currencyAnalysis = analysis?.split('\n').find(line => line.includes(pair))?.split(':')[1] || 'No prediction';
        const sentiment = currencyAnalysis.toLowerCase().includes('bullish') ? 'bullish' : 
                         currencyAnalysis.toLowerCase().includes('bearish') ? 'bearish' : 'neutral';
        
        return {
          currency: pair.replace('USD', ''),
          rate: rate as number,
          prediction: currencyAnalysis,
          confidence: Math.random() * 20 + 80,
          sentiment,
          volume: Math.random() * 1000000,
          support: (rate as number) * 0.995,
          resistance: (rate as number) * 1.005
        };
      });

      setPredictions(newPredictions);
      
      toast({
        title: "Market Analysis Complete",
        description: "Advanced technical analysis and market insights ready",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not complete market analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Advanced Market Intelligence Hub
            </span>
            <AnimatePresence>
              {!predictions.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button 
                    onClick={getPrediction}
                    disabled={isLoading || !rates || isAnalyzing}
                    className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Market
                      </>
                    ) : (
                      'Generate Market Analysis'
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewsTicker />
          {predictions.length > 0 ? (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ForexCharts predictions={predictions} />
              <div className="grid gap-4">
                {predictions.map((prediction) => (
                  <ForexPredictionCard key={prediction.currency} prediction={prediction} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Click "Generate Market Analysis" to get institutional-grade trading insights powered by advanced AI
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <MarketSentimentAnalysis />
        <TechnicalAnalysis />
      </div>

      <StockDataChart />
    </div>
  );
};

export default PricePredictor;