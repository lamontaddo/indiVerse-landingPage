import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import HowItWorks from './sections/HowItWorks'
import CreatorShowcase from './sections/CreatorShowcase'
import AudienceSection from './sections/AudienceSection'
import CTASection from './sections/CTASection'
import Footer from './sections/Footer'
import Onboarding from './pages/Onboarding'

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* Parallax Background Layers */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a0a1f] to-[#0a0a0f]" />
        <div className="absolute top-0 left-0 w-full h-[150vh] opacity-40">
          <img 
            src="/parallax-bg-1.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY2 }}
      >
        <div className="absolute top-[100vh] left-0 w-full h-[150vh] opacity-30">
          <img 
            src="/parallax-bg-2.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[50vh] -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/15 to-purple-600/15 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[120vh] right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-600/15 to-orange-600/15 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <CreatorShowcase />
        <AudienceSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Onboarding />} />
        <Route path="/login" element={<Onboarding />} />
      </Routes>
    </Router>
  )
}

export default App
