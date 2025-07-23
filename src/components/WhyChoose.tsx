const WhyChoose = () => {
  const features = [
    {
      title: "Expert Team",
      description:
        "Our team of certified professionals brings years of experience across diverse technologies and industries.",
    },
    {
      title: "End-to-End Solutions",
      description:
        "From concept to deployment, we handle every aspect of your project with meticulous attention to detail.",
    },
    {
      title: "Cutting-Edge Technology",
      description:
        "We leverage the latest technologies and frameworks to deliver modern, scalable solutions.",
    },
    {
      title: "Agile Methodology",
      description:
        "Our agile approach ensures faster delivery, better quality, and complete transparency throughout the process.",
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock support ensures your systems run smoothly and any issues are resolved quickly.",
    },
    {
      title: "Cost-Effective",
      description:
        "Competitive pricing with no hidden costs, delivering maximum value for your investment.",
    },
  ];

  return (
    <section className="bg-slate-900 py-10 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left - Features */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#BBE1FA] mb-5 sm:mb-6">
              Why Choose Exelus InfoTech?
            </h2>
            <p className="text-sm sm:text-xl text-[#BBE1FAB2] mb-6 sm:mb-8 leading-relaxed">
              We combine technical expertise with business acumen to deliver
              solutions that not only meet your current needs but also scale
              with your future growth.
            </p>

            <div className="space-y-5 sm:space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                    <img
                      src="/tick-mark.png"
                      alt="tick mark"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#BBE1FA] mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-[#BBE1FAB2] text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div
            className="bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg"
            style={{ boxShadow: "0 2px 24px 0 #222c36" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
              {[
                { label: "Client Satisfaction", value: "99%" },
                { label: "Average Response", value: "48h" },
                { label: "Technologies", value: "100+" },
                { label: "Certified", value: "ISO" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-slate-900 rounded-xl py-6 px-3 sm:py-8 sm:px-4 shadow-inner"
                  style={{ boxShadow: "0 2px 24px 0 #222c36" }}
                >
                  <div className="text-2xl sm:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#BBE1FAB2] text-xs sm:text-base text-center">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
