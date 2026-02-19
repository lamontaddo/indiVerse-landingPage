import { motion } from 'framer-motion'
import { Smartphone, ShoppingCart, Lock, Zap, Database, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Smartphone,
    title: 'Your Own App',
    description: 'A fully branded, personalized mobile app that your fans download and love. No coding required.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: ShoppingCart,
    title: 'Built-in Ecommerce',
    description: 'Sell merch, digital products, courses, and more — directly within your app. Zero friction.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Lock,
    title: 'Paywalled Content',
    description: 'Gate your premium content behind subscriptions. Your fans pay you directly, not a platform.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Zap,
    title: 'Instant Publishing',
    description: 'Post content once and reach your entire audience. No algorithm deciding who sees your work.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Database,
    title: 'Single Source of Truth',
    description: 'Everything lives in one place — your content, your store, your community. No more link-in-bio chaos.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Creator Analytics',
    description: 'Deep insights into your audience, revenue, and content performance. Own your data.',
    color: 'from-violet-500 to-purple-500',
  },
]

export default function Features() {
  return (
    <section 
      id="features" 
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-medium text-purple-400 tracking-wider uppercase mb-4">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Built for Creators,</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Not Platforms
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Stop stitching together ten different tools. indiVerse gives you everything in one beautifully integrated app.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="group relative h-full p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
