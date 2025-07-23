import { useState, useEffect } from "react";

interface LoaderProps {
  onFinish?: () => void;
}

const Loader = ({ onFinish }: LoaderProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1000);
    const finishTimer = setTimeout(() => onFinish?.(), 3000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Initial glowing logo - disappears when text appears */}
      {!showText && (
        <img
          src="/logo-favicon.png"
          alt="Exelus Logo"
          className="w-14 h-14 sm:w-16 sm:h-16 animate-pulse transition-opacity duration-500"
        />
      )}

      {/* Brand Text with embedded logo */}
      <div
        className={`flex items-center justify-center text-[#3282B8] text-2xl sm:text-3xl md:text-4xl font-semibold transition-all duration-1000 mt-4 ${
          showText ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <span className="mr-1">E</span>
        <img
          src="/logo-favicon.png"
          alt="X"
          className="w-8 h-8 sm:w-10 sm:h-10 -mx-1 transition-transform duration-500"
        />
        <span className="ml-1">elus InfoTech</span>
      </div>
    </div>
  );
};

export default Loader;
