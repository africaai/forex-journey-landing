import { Award, BookOpen, Users } from "lucide-react";

const Authority = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn from an Industry Expert
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <img
              src="https://cdn.fs.teachablecdn.com/oR3wdScZTceol4qgSxEt"
              alt="Dennis Okari"
              className="rounded-lg shadow-xl w-full object-cover h-[500px]"
            />
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                From Journalism to Trading Success
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With over a decade of experience in financial markets, Dennis Okari has
                transformed from a renowned journalist to a successful forex trader and
                mentor. His unique approach combines deep market analysis with
                practical trading strategies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Mentor</h4>
                  <p className="text-sm text-gray-600">10+ years of trading experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-gray-900">Community Leader</h4>
                  <p className="text-sm text-gray-600">1000+ successful students</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-gray-900">Proven Method</h4>
                  <p className="text-sm text-gray-600">Comprehensive curriculum</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/NTV_Kenya.svg/200px-NTV_Kenya.svg.png"
                alt="NTV"
                className="h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BBC_Logo_2021.svg/200px-BBC_Logo_2021.svg.png"
                alt="BBC"
                className="h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;