import { ForexRate } from '@/types/forex';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ForexPredictionCardProps {
  prediction: ForexRate;
}

const ForexPredictionCard = ({ prediction }: ForexPredictionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`
        border-l-4
        ${prediction.sentiment === 'bullish' ? 'border-l-green-500' : 
          prediction.sentiment === 'bearish' ? 'border-l-red-500' : 
          'border-l-yellow-500'}
      `}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">USD/{prediction.currency}</h3>
              <p className="text-sm text-muted-foreground max-w-[600px]">
                {prediction.prediction}
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Support: {prediction.support.toFixed(4)}</span>
                <span>Resistance: {prediction.resistance.toFixed(4)}</span>
                <span>Volume: {prediction.volume.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-xl">{prediction.rate.toFixed(4)}</p>
              <p className={`text-sm font-medium
                ${prediction.sentiment === 'bullish' ? 'text-green-600' : 
                  prediction.sentiment === 'bearish' ? 'text-red-600' : 
                  'text-yellow-600'}
              `}>
                {prediction.sentiment.toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">
                Confidence: {prediction.confidence.toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ForexPredictionCard;