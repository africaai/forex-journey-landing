import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi! I'm DennisBot. How can I help you learn about forex trading today?",
    isBot: true
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/tw6cffuaq7d5wgwevo8bzs797jioa3vd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.text();
      setMessages(prev => [...prev, { text: data, isBot: true }]);
    } catch (error) {
      toast({
        title: "Message failed to send",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96">
          <div className="p-4 border-b flex justify-between items-center bg-primary text-white rounded-t-lg">
            <h3 className="font-semibold">Chat with DennisBot</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-dark"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    Typing...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;