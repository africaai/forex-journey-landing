import { Twitter, Instagram, Facebook, TikTok, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SocialProof = () => {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/dennisokari", color: "text-blue-400" },
    { icon: Instagram, href: "https://instagram.com/dennisokari", color: "text-pink-500" },
    { icon: Facebook, href: "https://facebook.com/dennisokari", color: "text-blue-600" },
    { icon: TikTok, href: "https://tiktok.com/@dennisokari", color: "text-gray-800" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Connect with Dennis</h2>
        
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <social.icon className={`h-8 w-8 ${social.color} hover:scale-110 transition-transform`} />
            </a>
          ))}
        </div>
        
        <Card className="cursor-pointer transform transition-transform hover:scale-105 max-w-2xl mx-auto"
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
            <p className="text-gray-600">Read Dennis's insights on crucial trading lessons in Business Daily Africa</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SocialProof;