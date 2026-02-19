import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Claim Your App',
    description: 'Sign up and personalize your app with your brand, colors, and content categories. It\'s live in minutes.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '02',
    title: 'Post & Sell',
    description: 'Drop content, list products, or set up paywalled subscriptions. Everything your fans need, in one place.',
    color: 'from-pink-500 to-orange-500',
  },
  {
    number: '03',
    title: 'Grow Your Universe',
    description: 'Your fans download your app, engage with your content, and buy your products. You own the relationship.',
    color: 'from-orange-500 to-amber-500',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"])

  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-medium text-purple-400 tracking-wider uppercase mb-4">
            Simple as 1-2-3
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-white">How It </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500"
              style={{ height: lineHeight }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-start gap-8 md:gap-16 mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Number Circle */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-xl font-bold text-white">{step.number}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className={`flex-1 pt-2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
