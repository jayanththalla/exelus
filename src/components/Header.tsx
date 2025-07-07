import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
            >
              About
            </a>
            <a
              href="#"
              className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
            >
              Services
            </a>
            <a
              href="#"
              className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 rounded-lg bg-[#3282B8] text-white hover:bg-gradient-to-r hover:from-[#3282B8] hover:to-[#BBE1FA] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
              Get Quote
            </button>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
              >
                Home
              </a>
              <a
                href="#"
                className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
              >
                About
              </a>
              <a
                href="#"
                className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
              >
                Services
              </a>
              <a
                href="#"
                className="text-[#BBE1FA] hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#BBE1FAB2] after:transition-all after:duration-300 after:rounded-full"
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
