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
    <section className="bg-slate-800 py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#BBE1FA] mb-3">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm sm:text-base text-[#BBE1FAB2] max-w-xl mx-auto">
            We're proud to work with amazing companies of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-lg p-4 sm:p-6 text-center hover:bg-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl mb-1">{company.logo}</div>
              <div className="text-xs sm:text-sm text-[#BBE1FAB2]">
                {company.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trusted;
