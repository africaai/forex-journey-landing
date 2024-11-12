import { Twitter, Instagram, Facebook, ExternalLink } from "lucide-react";
import { Tweet } from "react-tweet";

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
            <div className="instagram-embed" dangerouslySetInnerHTML={{
              __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DBYQ2VOg8l3/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>`
            }} />
            <script async src="//www.instagram.com/embed.js"></script>
          </div>
          
          {/* Featured Article */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <ExternalLink className="text-gray-600" />
              <h3 className="font-semibold">Featured In</h3>
            </div>
            <a 
              href="https://www.businessdailyafrica.com/bd/sponsored/pro-trader-dennis-okari-3-expensive-lessons-trading-4645210"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://www.businessdailyafrica.com/img/bd/logo.png" 
                alt="Business Daily Africa"
                className="h-8 mb-4"
              />
              <p className="text-gray-600">Read Dennis's 3 Expensive Lessons in Trading</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;