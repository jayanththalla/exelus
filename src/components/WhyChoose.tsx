import React from "react";

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
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#BBE1FA] mb-6">
              Why Choose Exelus InfoTech?
            </h2>
            <p className="text-xl text-[#BBE1FAB2] mb-8 leading-relaxed">
              We combine technical expertise with business acumen to deliver
              solutions that not only meet your current needs but also scale
              with your future growth.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 bg-transparent">
                    <img
                      src="/tick-mark.png"
                      alt="tick mark"
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#BBE1FA] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-[#BBE1FAB2] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-slate-800 rounded-2xl p-8 shadow-lg"
            style={{ boxShadow: "0 2px 24px 0 #222c36" }}
          >
            <div className="grid grid-cols-2 gap-8">
              <div
                className="flex flex-col items-center justify-center bg-slate-900 rounded-xl py-8 px-4 shadow-inner"
                style={{ boxShadow: "0 2px 24px 0 #222c36" }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">99%</div>
                <div className="text-[#BBE1FAB2] text-base">
                  Client Satisfaction
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-slate-900 rounded-xl py-8 px-4 shadow-inner"
                style={{ boxShadow: "0 2px 24px 0 #222c36" }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">48h</div>
                <div className="text-[#BBE1FAB2] text-base">
                  Average Response
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-slate-900 rounded-xl py-8 px-4 shadow-inner"
                style={{ boxShadow: "0 2px 24px 0 #222c36" }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  100+
                </div>
                <div className="text-[#BBE1FAB2] text-base">Technologies</div>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-slate-900 rounded-xl py-8 px-4 shadow-inner"
                style={{ boxShadow: "0 2px 24px 0 #222c36" }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">ISO</div>
                <div className="text-[#BBE1FAB2] text-base">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
