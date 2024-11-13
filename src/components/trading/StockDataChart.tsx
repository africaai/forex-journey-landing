import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fetchIntradayData } from "@/services/alphavantage";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const intervals = ['1min', '5min', '15min', '30min', '60min'] as const;
const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];

export const StockDataChart = () => {
  const { toast } = useToast();
  const [symbol, setSymbol] = useState('AAPL');
  const [interval, setInterval] = useState<typeof intervals[number]>('5min');

  const { data: stockData, isLoading, error } = useQuery({
    queryKey: ['intraday', symbol, interval],
    queryFn: () => fetchIntradayData(symbol, interval),
    refetchInterval: 1200000, // 20 minutes
    retry: 3,
    staleTime: 1140000, // 19 minutes
    gcTime: 300000,
  });

  const handleError = useCallback(() => {
    if (error) {
      toast({
        title: "Error fetching stock data",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Handle error effect
  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error, handleError]);

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
          <div className="flex gap-2">
            {symbols.map((s) => (
              <Button
                key={s}
                variant={symbol === s ? "default" : "outline"}
                size="sm"
                onClick={() => setSymbol(s)}
              >
                {s}
              </Button>
            ))}
          </div>
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
          {stockData && stockData.length > 0 ? (
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
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default StockDataChart;