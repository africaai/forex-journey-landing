export interface ForexRate {
  currency: string;
  rate: number;
  prediction: string;
  confidence: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  volume: number;
  support: number;
  resistance: number;
}