const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export interface IntradayData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const fetchIntradayData = async (
  symbol: string,
  interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min',
  outputsize: 'compact' | 'full' = 'compact'
): Promise<IntradayData[]> => {
  const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch intraday data');
  }
  
  const data = await response.json();
  const timeSeriesKey = `Time Series (${interval})`;
  const timeSeries = data[timeSeriesKey];
  
  return Object.entries(timeSeries).map(([timestamp, values]: [string, any]) => ({
    timestamp,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume'])
  }));
};