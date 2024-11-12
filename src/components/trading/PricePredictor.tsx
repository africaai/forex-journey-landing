import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from "lucide-react";

interface ForexRate {
  currency: string;
  rate: number;
  prediction: string;
  confidence: number;
}

const PricePredictor = () => {
  const { toast } = useToast();
  const [predictions, setPredictions] = useState<ForexRate[]>([]);

  const { data: rates, isLoading } = useQuery({
    queryKey: ['forex-rates'],
    queryFn: async () => {
      const response = await fetch(
        'https://open.er-api.com/v6/latest/USD'
      );
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
    refetchInterval: 60000 // Refresh every minute
  });

  const getPrediction = async () => {
    if (!rates?.quotes) return;
    
    try {
      const prompt = `Analyze these current forex rates and provide a brief trading insight for each:
      USDEUR: ${rates.quotes.USDEUR}
      USDGBP: ${rates.quotes.USDGBP}
      USDCAD: ${rates.quotes.USDCAD}
      USDPLN: ${rates.quotes.USDPLN}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{
            role: "user",
            content: prompt
          }]
        })
      });

      if (!response.ok) throw new Error('Failed to get AI analysis');
      
      const data = await response.json();
      const analysis = data.choices[0].message.content;

      // Transform rates and analysis into chart data
      const newPredictions = Object.entries(rates.quotes).map(([pair, rate]) => ({
        currency: pair.replace('USD', ''),
        rate: rate as number,
        prediction: analysis.split('\n').find(line => line.includes(pair))?.split(':')[1] || 'No prediction',
        confidence: Math.random() * 20 + 80 // Simulated confidence score
      }));

      setPredictions(newPredictions);
      
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed current market conditions",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not complete market analysis",
        variant: "destructive",
      });
    }
  };

  const chartData = predictions.map(p => ({
    name: p.currency,
    rate: p.rate,
    confidence: p.confidence
  }));

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>AI-Powered Forex Analysis</span>
          <Button 
            onClick={getPrediction}
            disabled={isLoading || !rates}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Analyze Market'
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {predictions.length > 0 ? (
          <div className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#2563eb" 
                    name="Exchange Rate"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#16a34a" 
                    name="Confidence Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-4">
              {predictions.map((prediction) => (
                <Card key={prediction.currency}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">USD/{prediction.currency}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {prediction.prediction}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono">{prediction.rate.toFixed(4)}</p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {prediction.confidence.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Click "Analyze Market" to get AI-powered trading insights
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricePredictor;