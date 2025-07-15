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
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Initial glowing logo - disappears when text appears */}
      {!showText && (
        <img
          src="/logo-favicon.png"
          alt="Exelus Logo"
          className="w-16 h-16 animate-pulse transition-opacity duration-500"
        />
      )}

      {/* Text with larger embedded logo between E and elus */}
      <div
        className={`flex items-center text-[#3282B8] text-4xl font-semibold transition-all duration-1000 ${
          showText ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <span>E</span>
        <img
          src="/logo-favicon.png"
          alt="X"
          className="w-10 h-10 -mx-1  transition-transform duration-500"
        />
        <span>elus InfoTech</span>
      </div>
    </div>
  );
};

export default Loader;
