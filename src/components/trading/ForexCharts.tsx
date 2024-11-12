import { ForexRate } from '@/types/forex';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface ForexChartsProps {
  predictions: ForexRate[];
}

const ForexCharts = ({ predictions }: ForexChartsProps) => {
  const chartData = predictions.map(p => ({
    name: p.currency,
    rate: p.rate,
    confidence: p.confidence,
    volume: p.volume,
    support: p.support,
    resistance: p.resistance
  }));

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="rate" stroke="#2563eb" fillOpacity={1} fill="url(#colorRate)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="support" stroke="#16a34a" name="Support" />
            <Line type="monotone" dataKey="resistance" stroke="#dc2626" name="Resistance" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ForexCharts;