import { Shield, Award, Clock } from "lucide-react";

const Partners = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600">
            Trade with confidence using our recommended brokers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Regulated",
              description: "All partners are fully licensed and regulated",
              icon: Shield,
            },
            {
              title: "Competitive",
              description: "Best trading conditions and spreads",
              icon: Award,
            },
            {
              title: "Reliable",
              description: "Fast execution and 24/7 support",
              icon: Clock,
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((partner) => (
            <div
              key={partner}
              className="bg-gray-100 p-8 rounded-xl flex items-center justify-center"
            >
              <img
                src={`https://via.placeholder.com/150x50?text=Partner${partner}`}
                alt={`Partner ${partner}`}
                className="max-w-full h-auto opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;