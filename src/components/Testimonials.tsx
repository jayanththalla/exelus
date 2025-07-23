const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar: "👩‍💼",
      rating: 5,
      text: "Exelus InfoTech transformed our business with their exceptional web development and digital marketing services. Our online presence has never been stronger.",
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLab",
      avatar: "👨‍💻",
      rating: 5,
      text: "The team delivered our mobile app ahead of schedule with outstanding quality. Their technical expertise and communication throughout the project were exceptional.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthCorp",
      avatar: "👩‍🎓",
      rating: 5,
      text: "Their digital marketing strategies increased our lead generation by 300%. The ROI on our investment with Exelus has been phenomenal.",
    },
  ];

  return (
    <section className="bg-slate-900 py-10 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#BBE1FA] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-[#BBE1FAB2] max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 hover:border-blue-500 transition-colors"
            >
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="text-yellow-400 text-base sm:text-lg"
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-[#BBE1FAB2] mb-6 text-sm sm:text-base leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-base sm:text-lg">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="text-[#BBE1FA] font-medium text-sm sm:text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-[#BBE1FAB2] text-xs sm:text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
