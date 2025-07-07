import React from "react";

const Trusted = () => {
  const companies = [
    { name: "TechCorp", logo: "🏢" },
    { name: "InnovateLab", logo: "🔬" },
    { name: "Digital Hub", logo: "💻" },
    { name: "CloudTech", logo: "🚀" },
    { name: "StartupXYZ", logo: "🚀" },
    { name: "DataFlow", logo: "📊" },
  ];

  return (
    <section className="bg-slate-800 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#BBE1FA] mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[#BBE1FAB2]">
            We're proud to work with amazing companies of all sizes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-lg p-6 text-center hover:bg-slate-600 transition-colors"
            >
              <div className="text-3xl mb-2">{company.logo}</div>
              <div className="text-[#BBE1FAB2] text-sm">{company.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trusted;
