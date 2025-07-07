import React, { useState, useEffect } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetText = "Digital Solutions";
  const typingSpeed = 100; // milliseconds

  useEffect(() => {
    if (currentIndex < targetText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + targetText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, targetText]);

  return (
    <section className="bg-slate-900 relative overflow-hidden min-h-screen flex flex-col">
      {/* Animated floating bubbles */}
      <div
        className="absolute top-20 left-20 w-3 h-3 bg-[#BFFFFF] rounded-full opacity-60 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-40 right-32 w-4 h-4 bg-gray-600 rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "0.5s", animationDuration: "2s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#BFFFFF] rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1s", animationDuration: "2.5s" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-3 h-3 bg-gray-500 rounded-full opacity-40 animate-bounce"
        style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
      ></div>
      <div
        className="absolute top-1/2 right-10 w-2 h-2 bg-[#BFFFFF] rounded-full opacity-60 animate-pulse"
        style={{ animationDelay: "2s", animationDuration: "2.2s" }}
      ></div>
      <div
        className="absolute bottom-1/2 left-10 w-2 h-2 bg-[#BFFFFF] rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "0.3s", animationDuration: "2.8s" }}
      ></div>

      {/* Additional floating bubbles for enhanced effect */}
      <div
        className="absolute top-1/3 left-1/3 w-1 h-1 bg-[#BBE1FAB2] rounded-full opacity-70 animate-bounce"
        style={{ animationDelay: "0.7s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#3282B8] rounded-full opacity-60 animate-pulse"
        style={{ animationDelay: "1.2s", animationDuration: "3.2s" }}
      ></div>
      <div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#BBE1FAB2] rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "1.8s", animationDuration: "2.7s" }}
      ></div>

      <div className="container mx-auto px-6 py-20 text-center flex-1 flex flex-col justify-center">
        <h1
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
          style={{
            background:
              "linear-gradient(0deg, #BFFFFF, #BFFFFF), linear-gradient(90deg, #3282B8 0%, #BBE1FA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Transforming Ideas Into
          <br />
          <span style={{ color: "#BBE1FAB2" }}>
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          At Exelus InfoTech, we deliver cutting-edge IT solutions, from custom
          software development to digital marketing, helping businesses thrive
          in the digital age.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-3 rounded-lg transition-colors flex items-center justify-center border border-[#3282B8] bg-[#BFFFFF] text-[#222] font-semibold">
            Get Free Quote <span className="ml-2">→</span>
          </button>
          <button className="px-8 py-3 rounded-lg transition-colors border border-[#3282B8] bg-transparent text-[#3282B8] hover:bg-[#3282B8] hover:text-[#fff] font-semibold">
            Schedule Consultation
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-[#3282B8]">
              500+
            </div>
            <div className="text-[#BBE1FAB2] text-sm">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-[#3282B8]">
              50+
            </div>
            <div className="text-[#BBE1FAB2] text-sm">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-[#3282B8]">
              5+
            </div>
            <div className="text-[#BBE1FAB2] text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-[#3282B8]">
              24/7
            </div>
            <div className="text-[#BBE1FAB2] text-sm">Support</div>
          </div>
        </div>
      </div>

      <div className="text-center pb-8">
        <button
          onClick={() => {
            const section = document.getElementById("our-core-services");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{ background: "none", border: "none", padding: 0, margin: 0 }}
          aria-label="Scroll to Our Core Services"
        >
          <img
            src="/arrow-up.png"
            alt="Scroll down"
            className="w-8 h-8 rotate-180 mx-auto cursor-pointer hover:opacity-80 transition-opacity -mt-16"
          />
        </button>
      </div>
    </section>
  );
};

export default Hero;
