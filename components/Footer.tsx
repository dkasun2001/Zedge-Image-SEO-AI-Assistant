import React from "react";
import { Link } from "react-router-dom";
import { IconGitHub, IconLinkedIn } from "./Icon";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 text-sm text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} ImageSeo - AI Assistant.
            </p>
            <nav className="flex gap-x-4">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className=" md:inline">Developed by Dinusha Kasun</span>
            <a
              href="https://github.com/dkasun2001/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <IconGitHub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dinusha-kasun-heenatiyangala/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <IconLinkedIn className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
