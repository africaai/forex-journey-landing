interface WebhookConfig {
  endpoint: string;
  retries?: number;
  rateLimitMs?: number;
}

class WebhookService {
  private static lastCallTime: { [key: string]: number } = {};
  private static queues: { [key: string]: Promise<any> } = {};

  static async call(config: WebhookConfig, data: any) {
    const { endpoint, retries = 3, rateLimitMs = 1000 } = config;

    // Check rate limit
    const now = Date.now();
    const lastCall = this.lastCallTime[endpoint] || 0;
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall < rateLimitMs) {
      await new Promise(resolve => setTimeout(resolve, rateLimitMs - timeSinceLastCall));
    }

    // Queue the request
    if (!this.queues[endpoint]) {
      this.queues[endpoint] = Promise.resolve();
    }

    return this.queues[endpoint] = this.queues[endpoint].then(async () => {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data,
              timestamp: new Date().toISOString(),
              deviceInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
              },
            }),
          });

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          this.lastCallTime[endpoint] = Date.now();
          return await response.json();
        } catch (error) {
          attempt++;
          if (attempt === retries) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    });
  }
}

export const webhookEndpoints = {
  signUp: 'https://hook.eu2.make.com/8pqd5dv7mt5eko4657yw3lanaj4cgaxm',
  webinar: 'https://hook.eu2.make.com/8pqd5dv7mt5eko4657yw3lanaj4cgaxm',
  userActivity: 'https://hook.eu2.make.com/user-activity-webhook',
  errorLogging: 'https://hook.eu2.make.com/error-logging-webhook',
  analytics: 'https://hook.eu2.make.com/analytics-webhook',
};

export default WebhookService;