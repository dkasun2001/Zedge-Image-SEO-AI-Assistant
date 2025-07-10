import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { IconPhotoSeo, IconMenu, IconX } from "./Icon";

// No need for Page type anymore since we're using real routes

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ to, children, isMobile }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `rounded-md font-medium transition-colors ${
          isMobile
            ? "block w-full text-left px-3 py-2 text-base"
            : "px-3 py-2 text-sm"
        } ${
          isActive
            ? "bg-cyan-500/10 text-cyan-400"
            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <RouterNavLink to="/" className="flex items-center space-x-3">
              <IconPhotoSeo className="h-8 w-8 text-cyan-400" />
              <h1 className="text-xl font-bold text-white tracking-tight">
                ImageSeo
              </h1>
            </RouterNavLink>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/guide">How to Use</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <IconX className="block h-6 w-6" />
              ) : (
                <IconMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50">
            <NavLink to="/" isMobile>
              Home
            </NavLink>
            <NavLink to="/guide" isMobile>
              How to Use
            </NavLink>
            <NavLink to="/about" isMobile>
              About Us
            </NavLink>
            <NavLink to="/contact" isMobile>
              Contact Us
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
