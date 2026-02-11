"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 h-16 glass soft-shadow">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 ${isScrolled ? "glass soft-shadow py-2" : "bg-transparent py-3"}`}>
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          BG<span className="text-primary">Remover</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Home
          </Link>
          <Link href="/#features" className="opacity-80 hover:opacity-100 transition-opacity">
            Features
          </Link>
          <Link href="/#contact" className="opacity-80 hover:opacity-100 transition-opacity">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass soft-shadow mt-2"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="block py-2 opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#contact"
              className="block py-2 opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}