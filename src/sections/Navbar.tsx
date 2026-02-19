import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Creators', href: '#creators' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="indiVerse" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Log in
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/signup"
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all inline-block"
              >
                Get Early Access
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link 
                  to="/login" 
                  className="block text-gray-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Early Access
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
