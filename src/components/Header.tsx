"use client";

import { useState } from "react";
import Link from "next/link";
import { RestaurantInfo } from "@/lib/types";

export default function Header({ info }: { info: RestaurantInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🍕</span>
            <div>
              <span className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors">
                {info.name}
              </span>
              <span className="hidden sm:block text-xs text-stone-400">
                {info.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-stone-300 hover:text-brand-gold transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/menu"
              className="text-stone-300 hover:text-brand-gold transition-colors font-medium"
            >
              La Carte
            </Link>
            <Link
              href="/contact"
              className="text-stone-300 hover:text-brand-gold transition-colors font-medium"
            >
              Contact
            </Link>
            <a
              href={`tel:${info.phone.replace(/\s/g, "")}`}
              className="btn-primary text-sm !px-5 !py-2"
            >
              📞 {info.phone}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-stone-700 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-stone-300 hover:text-brand-gold transition-colors font-medium py-2"
              >
                Accueil
              </Link>
              <Link
                href="/menu"
                onClick={() => setIsMenuOpen(false)}
                className="text-stone-300 hover:text-brand-gold transition-colors font-medium py-2"
              >
                La Carte
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-stone-300 hover:text-brand-gold transition-colors font-medium py-2"
              >
                Contact
              </Link>
              <a
                href={`tel:${info.phone.replace(/\s/g, "")}`}
                className="btn-primary text-center text-sm mt-2"
              >
                📞 Appeler: {info.phone}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
