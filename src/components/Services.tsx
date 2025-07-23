const Services = () => {
  const services = [
    {
      icon: "💻",
      title: "Project Development",
      description:
        "Custom software solutions, web & mobile apps, MVP development with cutting-edge technologies.",
      features: [
        "Custom Software",
        "Web & Mobile Apps",
        "MVP Development",
        "Product Engineering",
      ],
    },
    {
      icon: "🔧",
      title: "IT Services",
      description:
        "Comprehensive IT support, cloud services, cybersecurity, and infrastructure management.",
      features: [
        "Cloud Services",
        "Managed IT Support",
        "Cybersecurity",
        "IT Consulting",
      ],
    },
    {
      icon: "📈",
      title: "Digital Marketing",
      description:
        "Strategic digital marketing solutions to boost your online presence and drive growth.",
      features: [
        "SEO Optimization",
        "PPC Campaigns",
        "Social Media",
        "Content Strategy",
      ],
    },
    {
      icon: "🎨",
      title: "Media & Content",
      description:
        "Professional editing services, graphic design, animation, and creative content solutions.",
      features: [
        "Video Editing",
        "Graphic Design",
        "Motion Graphics",
        "Animation & VFX",
      ],
    },
  ];

  return (
    <section id="our-core-services" className="bg-slate-900 py-10 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#BBE1FA] mb-4">
            Our Core Services
          </h2>
          <p className="text-base sm:text-xl text-[#BBE1FAB2] max-w-3xl mx-auto">
            We offer comprehensive IT solutions across four key domains to help
            your business succeed in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:p-6 hover:border-blue-500 transition-colors"
            >
              <div className="text-3xl sm:text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#BBE1FA] mb-2">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-[#BBE1FAB2] mb-5 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-5">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-gray-400 text-sm flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
