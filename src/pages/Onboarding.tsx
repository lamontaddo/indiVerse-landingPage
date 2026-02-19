import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  Sparkles,
  User,
  Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'

const socialProviders = [
  { 
    name: 'Google', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    color: 'hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
  },
  { 
    name: 'Apple', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    color: 'hover:bg-gray-500/10 hover:border-gray-500/30 hover:text-gray-300'
  },
  { 
    name: 'X', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: 'hover:bg-slate-500/10 hover:border-slate-500/30 hover:text-slate-300'
  },
]

export default function Onboarding() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (isSignUp && !formData.agreeToTerms) {
      newErrors.terms = 'You must agree to the terms'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)
  }

  const handleSocialLogin = (_provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to indiVerse!
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {isSignUp 
              ? "Your account has been created. Check your email to verify your account and get started."
              : "You've successfully signed in. Redirecting to your dashboard..."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Go to Homepage
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/15 to-purple-600/15 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <Link to="/" className="inline-flex items-center">
          <img 
            src="/logo.png" 
            alt="indiVerse" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-gray-400 text-sm">
                {isSignUp 
                  ? 'Start building your creator universe today' 
                  : 'Sign in to continue your journey'}
              </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {socialProviders.map((provider) => (
                <motion.button
                  key={provider.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin(provider.name)}
                  disabled={isLoading}
                  className={`flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all ${provider.color}`}
                >
                  {provider.icon}
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500 uppercase">or continue with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                          errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                      errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                      errors.password ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Terms Checkbox */}
              {isSignUp && (
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/50"
                    />
                    <span className="text-sm text-gray-400">
                      I agree to the{' '}
                      <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.terms}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Sign In/Up */}
            <p className="text-center text-sm text-gray-400 mt-6">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setErrors({})
                }}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}
