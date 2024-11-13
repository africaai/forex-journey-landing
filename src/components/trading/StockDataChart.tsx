import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fetchIntradayData, IntradayData } from "@/services/alphavantage";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const intervals = ['1min', '5min', '15min', '30min', '60min'] as const;

export const StockDataChart = () => {
  const { toast } = useToast();
  const [symbol, setSymbol] = useState('IBM');
  const [interval, setInterval] = useState<typeof intervals[number]>('5min');

  const { data: stockData, isLoading, error } = useQuery({
    queryKey: ['intraday', symbol, interval],
    queryFn: () => fetchIntradayData(symbol, interval),
    refetchInterval: 60000, // Refresh every minute
    onError: () => {
      toast({
        title: "Error fetching stock data",
        description: "Please try again later",
        variant: "destructive",
      });
    }
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
        <CardTitle className="flex justify-between items-center">
          <span>{symbol} Stock Price</span>
          <div className="flex gap-2">
            {intervals.map((i) => (
              <Button
                key={i}
                variant={interval === i ? "default" : "outline"}
                size="sm"
                onClick={() => setInterval(i)}
              >
                {i}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#2563eb"
                dot={false}
                name="Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default StockDataChart;