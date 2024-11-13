interface Environment {
  apiKeys: {
    openai: string;
    alphavantage: string;
  };
  webhooks: {
    baseUrl: string;
    endpoints: {
      signUp: string;
      webinar: string;
      userActivity: string;
      errorLogging: string;
      analytics: string;
    };
  };
  features: {
    enableAnalytics: boolean;
    enableErrorLogging: boolean;
    enableUserTracking: boolean;
  };
}

const environment: Environment = {
  apiKeys: {
    openai: import.meta.env.VITE_OPENAI_API_KEY || '',
    alphavantage: import.meta.env.VITE_ALPHAVANTAGE_API_KEY || '',
  },
  webhooks: {
    baseUrl: 'https://hook.eu2.make.com',
    endpoints: {
      signUp: '/8pqd5dv7mt5eko4657yw3lanaj4cgaxm',
      webinar: '/8pqd5dv7mt5eko4657yw3lanaj4cgaxm',
      userActivity: '/user-activity-webhook',
      errorLogging: '/error-logging-webhook',
      analytics: '/analytics-webhook',
    },
  },
  features: {
    enableAnalytics: import.meta.env.MODE === 'production',
    enableErrorLogging: import.meta.env.MODE === 'production',
    enableUserTracking: import.meta.env.MODE === 'production',
  },
};

if (!environment.apiKeys.openai) {
  console.warn('OpenAI API key is not set');
}

if (!environment.apiKeys.alphavantage) {
  console.warn('AlphaVantage API key is not set');
}

export default environment;