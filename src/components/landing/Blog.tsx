import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Trading Insights
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with our latest articles and market analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Understanding Market Psychology",
              category: "Trading Psychology",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
            },
            {
              title: "Technical Analysis Fundamentals",
              category: "Technical Analysis",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
            },
            {
              title: "Risk Management Strategies",
              category: "Risk Management",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
            },
          ].map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-accent font-semibold mb-2">{post.category}</p>
                <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                <Button variant="ghost" className="group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;