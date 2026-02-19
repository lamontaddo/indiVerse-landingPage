import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles } from 'lucide-react'

const creators = [
  { name: 'Lamarr Boss', handle: '@lamarr', color: 'from-purple-500 to-pink-500' },
  { name: 'Theresa', handle: '@theresa', color: 'from-pink-500 to-rose-500' },
  { name: 'Kayla', handle: '@kayla', color: 'from-orange-500 to-amber-500' },
  { name: 'Kyla', handle: '@kyla', color: 'from-cyan-500 to-blue-500' },
  { name: 'Kerry', handle: '@kerry', color: 'from-emerald-500 to-teal-500' },
]

export default function CreatorShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={sectionRef}
      id="creators" 
      className="relative py-24 md:py-32"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-medium text-purple-400 tracking-wider uppercase mb-4">
            MONTECH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">indi</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Verse
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Choose a world to enter. Each app is its own universe, with its own vibe, music, and people.
          </p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">5 Active Realms</span>
          </motion.div>
        </motion.div>

        {/* Creator Avatars */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {creators.map((creator, index) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Avatar */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${creator.color} p-0.5`}>
                  <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br ${creator.color} opacity-50`} />
                  </div>
                </div>
                
                {/* Glow on hover */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${creator.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                
                {/* Name */}
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                    {creator.name}
                  </p>
                  <p className="text-xs text-gray-500">{creator.handle}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-gray-500"
        >
          Built by Montech • One codebase, multiple universes.
        </motion.p>
      </motion.div>
    </section>
  )
}
