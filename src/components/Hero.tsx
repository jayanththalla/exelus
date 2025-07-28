import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import QuoteForm from "./QuoteForm";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const targetText = "Digital Solutions";
  const typingSpeed = 100; // milliseconds
  const heroRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < targetText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + targetText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, targetText]);

  // Floating bubble components
  type FloatingBubbleProps = {
    position: string;
    delay: string;
    duration: string;
    size: number;
    color: string;
    opacity: number;
    animationType: string;
  };

  const FloatingBubble = ({
    position,
    delay,
    duration,
    size,
    color,
    opacity,
    animationType,
  }: FloatingBubbleProps) => {
    const animationClass =
      {
        bounce: "animate-bounce",
        pulse: "animate-pulse",
        ping: "animate-ping",
      }[animationType] || "animate-pulse";

    return (
      <motion.div
        className={`absolute ${position} rounded-full ${color} ${animationClass}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity }}
        transition={{
          delay: parseFloat(delay),
          duration: parseFloat(duration),
        }}
      />
    );
  };

  const scrollToNextSection = () => {
    const section = document.getElementById("our-core-services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="bg-slate-900 relative overflow-hidden min-h-screen flex flex-col"
      ref={heroRef}
    >
      {/* Floating bubbles with motion effects */}
      <FloatingBubble
        position="top-20 left-20"
        delay="0"
        duration="3"
        size={12}
        color="bg-[#BFFFFF]"
        opacity={0.6}
        animationType="bounce"
      />
      <FloatingBubble
        position="top-40 right-32"
        delay="0.5"
        duration="2"
        size={16}
        color="bg-gray-600"
        opacity={0.4}
        animationType="pulse"
      />
      <FloatingBubble
        position="bottom-32 left-1/4"
        delay="1"
        duration="2.5"
        size={8}
        color="bg-[#BFFFFF]"
        opacity={0.5}
        animationType="ping"
      />
      <FloatingBubble
        position="bottom-20 right-20"
        delay="1.5"
        duration="3.5"
        size={12}
        color="bg-gray-500"
        opacity={0.4}
        animationType="bounce"
      />
      <FloatingBubble
        position="top-1/2 right-10"
        delay="2"
        duration="2.2"
        size={8}
        color="bg-[#BFFFFF]"
        opacity={0.6}
        animationType="pulse"
      />
      <FloatingBubble
        position="bottom-1/2 left-10"
        delay="0.3"
        duration="2.8"
        size={8}
        color="bg-[#BFFFFF]"
        opacity={0.5}
        animationType="ping"
      />
      <FloatingBubble
        position="top-1/3 left-1/3"
        delay="0.7"
        duration="4"
        size={4}
        color="bg-[#BBE1FAB2]"
        opacity={0.7}
        animationType="bounce"
      />
      <FloatingBubble
        position="top-2/3 right-1/3"
        delay="1.2"
        duration="3.2"
        size={4}
        color="bg-[#3282B8]"
        opacity={0.6}
        animationType="pulse"
      />
      <FloatingBubble
        position="top-1/4 right-1/4"
        delay="1.8"
        duration="2.7"
        size={8}
        color="bg-[#BBE1FAB2]"
        opacity={0.5}
        animationType="ping"
      />

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 text-center flex-1 flex flex-col justify-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-10 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "linear-gradient(0deg, #BFFFFF, #BFFFFF), linear-gradient(90deg, #3282B8 0%, #BBE1FA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Transforming Ideas Into
          <br />
          <motion.span
            style={{
              background: "linear-gradient(90deg, #3282B8 0%, #BBE1FA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {displayText}
            <span
              className={`inline-block ml-1 ${
                isTypingComplete ? "animate-pulse" : ""
              }`}
            >
              |
            </span>
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          At Exelus InfoTech, we deliver cutting-edge IT solutions, from custom
          software development to digital marketing, helping businesses thrive
          in the digital age.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button 
            onClick={() => setIsQuoteFormOpen(true)}
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center border-2 border-[#3282B8] bg-[#BFFFFF] text-[#222] font-semibold hover:bg-transparent hover:text-[#BFFFFF] hover:shadow-lg hover:shadow-[#3282B8]/30"
          >
            Get Free Quote{" "}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
          <button className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 border-2 border-[#3282B8] bg-transparent text-[#3282B8] hover:bg-[#3282B8] hover:text-white font-semibold hover:shadow-lg hover:shadow-[#3282B8]/30">
            Schedule Consultation
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {[
            { value: "20+", label: "Projects Delivered" },
            { value: "10+", label: "Happy Clients" },
            { value: "2+", label: "Years Experience" },
            { value: "24/7", label: "Support" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-slate-800/30 rounded-lg backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-[#3282B8]">
                {item.value}
              </div>
              <div className="text-[#BBE1FAB2] text-xs sm:text-sm">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="text-center pb-6 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button
          onClick={scrollToNextSection}
          className="mx-auto cursor-pointer hover:opacity-80 transition-opacity -mt-12 md:-mt-16 focus:outline-none"
          aria-label="Scroll to Our Core Services"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#3282B8] rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </button>
      </motion.div>
      
      <QuoteForm 
        isOpen={isQuoteFormOpen} 
        onClose={() => setIsQuoteFormOpen(false)} 
      />
    </section>
  );
};

export default Hero;
