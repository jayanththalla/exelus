import { Facebook, Sms, Call } from "iconsax-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-12" />
            </div>

            <p className="text-[#BBE1FAB2] mb-6 text-sm leading-relaxed">
              Transforming businesses through innovative IT solutions, digital
              marketing, and creative services.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
              >
                <Facebook size="16" color="#3282B8" variant="Bold" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
              >
                <FaTwitter size={16} color="#3282B8" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
              >
                <FaLinkedin size={16} color="#3282B8" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#3282B8] font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  Project Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  IT Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  Media & Content
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#3282B8] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm flex items-center gap-2"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#3282B8] font-semibold mb-4">
              Stay Connected
            </h4>
            <p className="text-[#BBE1FAB2] text-sm mb-4">
              Drop a mail to get in touch with the team. We serve you the best
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Sms
                  size="16"
                  color="#3282B8"
                  variant="Outline"
                  className="absolute left-3 top-3"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-[#3282B8] placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button className="w-full text-black py-2 px-4 rounded-lg bg-[#3282B8] hover:bg-gradient-to-r from-[#3282B8] to-[#BBE1FA] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <Sms size="16" color="#000" variant="Bold" />
                Contact
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#BBE1FAB2] hover:text-[#3282B8] transition-colors text-sm">
              <Call size="16" color="#3282B8" variant="Outline" />
              <a href="tel:+917013092021">+91 70130 92021</a>
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Exelus InfoTech. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#3282B8] transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#3282B8] transition-colors text-sm"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mb-2"></div>

        <div className="text-center -mt-28">
          <div className="inline-block">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
              }}
              aria-label="Scroll to top"
            >
              <img
                src="/arrow-up.png"
                alt="Scroll to top"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
