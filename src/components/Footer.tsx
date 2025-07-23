import { Facebook, Sms, Call } from "iconsax-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-6 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="h-10 sm:h-12"
                loading="lazy"
              />
            </div>

            <p className="text-[#BBE1FAB2] text-sm sm:text-base leading-relaxed">
              Transforming businesses through innovative IT solutions, digital
              marketing, and creative services.
            </p>

            <div className="flex space-x-3">
              {[
                {
                  icon: <Facebook size="18" color="#3282B8" variant="Bold" />,
                  label: "Facebook",
                },
                {
                  icon: <FaTwitter size={18} color="#3282B8" />,
                  label: "Twitter",
                },
                {
                  icon: <FaLinkedin size={18} color="#3282B8" />,
                  label: "LinkedIn",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors hover:scale-105"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#3282B8] font-semibold mb-4 text-lg">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Project Development",
                "IT Services",
                "Digital Marketing",
                "Media & Content",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#3282B8] font-semibold mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About Us", "Portfolio", "Contact", "Careers"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-[#3282B8] font-semibold mb-4 text-lg">
              Stay Connected
            </h4>
            <p className="text-[#BBE1FAB2] text-sm sm:text-base">
              Drop a mail to get in touch with the team. We serve you the best
            </p>

            <div className="space-y-3">
              <div className="relative">
                <Sms
                  size="18"
                  color="#3282B8"
                  variant="Outline"
                  className="absolute left-3 top-3"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-[#BBE1FA] placeholder-[#BBE1FAB2] focus:outline-none focus:ring-2 focus:ring-[#3282B8] focus:border-transparent transition-all"
                  aria-label="Email input for contact"
                />
              </div>

              <button
                className="w-full text-white py-2 px-4 rounded-lg bg-[#3282B8] hover:bg-gradient-to-r hover:from-[#3282B8] hover:to-[#BBE1FA] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                aria-label="Contact us button"
              >
                <Sms
                  size="18"
                  color="#fff"
                  variant="Bold"
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Contact</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm sm:text-base">
              <Call size="18" color="#3282B8" variant="Outline" />
              <a href="tel:+917013092021" aria-label="Call us">
                +91 70130 92021
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#BBE1FAB2] text-xs sm:text-sm">
              © {new Date().getFullYear()} Exelus InfoTech. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {["Privacy Policy", "Terms & Conditions"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-xs sm:text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button - only visible when scrolled down */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#3282B8] hover:bg-[#BBE1FA] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;
