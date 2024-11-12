import { Twitter, Instagram, ExternalLink } from "lucide-react";
import { Tweet } from "react-tweet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SocialProof = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Connect with Dennis</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Twitter */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Twitter className="text-blue-400" />
              <h3 className="font-semibold">Latest Tweet</h3>
            </div>
            <Tweet id="1851954097643000296" />
          </div>
          
          {/* Instagram */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Instagram className="text-pink-500" />
              <h3 className="font-semibold">Instagram</h3>
            </div>
            <iframe
              src="https://www.instagram.com/p/DBYQ2VOg8l3/embed"
              className="w-full h-[450px] border-none"
              loading="lazy"
            ></iframe>
          </div>
          
          {/* Featured Article */}
          <Card className="cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => window.open('https://www.businessdailyafrica.com/bd/sponsored/pro-trader-dennis-okari-3-expensive-lessons-trading-4645210', '_blank')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Featured Article
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                alt="Trading Dashboard"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="font-semibold text-lg mb-2">3 Expensive Lessons in Trading</h4>
              <p className="text-gray-600 text-sm">Read Dennis's insights on crucial trading lessons in Business Daily Africa</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;