import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Loader2,
  Compass,
  Video,
  Globe,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type UserType = 'explorer' | 'creator' | null
type Step = 'auth-choice' | 'type-select' | 'form'

const socialProviders = [
  {
    name: 'Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    color: 'hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400',
  },
  {
    name: 'Apple',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    color: 'hover:bg-gray-500/10 hover:border-gray-500/30 hover:text-gray-300',
  },
  {
    name: 'X',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'hover:bg-slate-500/10 hover:border-slate-500/30 hover:text-slate-300',
  },
]

const explorerPerks = [
  'Follow your favourite creators',
  'Discover indie content across all genres',
  'Personalised feed & recommendations',
  'Exclusive early-access drops',
]

const creatorPerks = [
  'Host & monetise your content',
  'Build and grow your fanbase',
  'Analytics & audience insights',
  'Priority listing & promotional tools',
]

export default function Onboarding() {
  const [step, setStep] = useState<Step>('auth-choice')
  const [isSignUp, setIsSignUp] = useState(true)
  const [userType, setUserType] = useState<UserType>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Creator-specific
    creatorHandle: '',
    contentCategory: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'

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

    if (userType === 'creator') {
      if (!formData.creatorHandle.trim()) newErrors.creatorHandle = 'Handle is required'
      if (!formData.contentCategory) newErrors.contentCategory = 'Please select a category'
    }

    if (!formData.agreeToTerms) newErrors.terms = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
  }

  const handleSocialLogin = (_provider: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  const goBack = () => {
    if (step === 'form') setStep('type-select')
    else if (step === 'type-select') setStep('auth-choice')
  }

  // ─── Success Screen ────────────────────────────────────────────────────────
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
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${userType === 'creator'
              ? 'bg-gradient-to-br from-amber-400 to-orange-500'
              : 'bg-gradient-to-br from-blue-400 to-purple-500'
              }`}
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {userType === 'creator' ? 'Creator account created!' : 'Welcome, Explorer!'}
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {userType === 'creator'
              ? "Your creator profile is being set up. We'll email you next steps to start hosting your content."
              : 'Your account is ready. Start discovering amazing indie content on indiVerse.'}
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

  // ─── Background + Nav wrapper ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/15 to-purple-600/15 blur-[100px]" />
        {userType === 'creator' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-600/10 to-orange-600/10 blur-[100px]"
          />
        )}
      </div>

      {/* Nav */}
      <nav className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center">
            <img src="/logo.png" alt="indiVerse" className="h-8 md:h-10 w-auto object-contain" />
          </Link>
          {step !== 'auth-choice' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={goBack}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </motion.button>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Sign In / Sign Up ───────────────────────────────── */}
          {step === 'auth-choice' && (
            <motion.div
              key="auth-choice"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex items-center justify-center mx-auto mb-4"
                  >
                    <img src="/logo.png" alt="indiVerse" className="h-12 w-auto object-contain" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {isSignUp ? 'Join indiVerse' : 'Welcome back'}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {isSignUp
                      ? 'Create an account to get started'
                      : 'Sign in to continue your journey'}
                  </p>
                </div>

                {/* Sign Up CTA cards */}
                {isSignUp && (
                  <div className="space-y-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setUserType('explorer'); setStep('type-select') }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-400/40 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                        <Compass className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold text-sm">Sign up as Explorer</p>
                        <p className="text-gray-400 text-xs">Discover & follow creators</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 ml-auto transition-colors" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setUserType('creator'); setStep('type-select') }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/20 hover:border-amber-400/40 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold text-sm">Sign up as Creator</p>
                        <p className="text-gray-400 text-xs">Host & monetise your content</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 ml-auto transition-colors" />
                    </motion.button>
                  </div>
                )}

                {/* Sign In form (shown when isSignUp=false) */}
                {!isSignUp && (
                  <div className="mb-6">
                    {/* Social */}
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
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-xs text-gray-500 uppercase">or email</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'}`}
                          />
                        </div>
                        {errors.email && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.email}</motion.p>}
                      </div>
                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${errors.password ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'}`}
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.password}</motion.p>}
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                      </motion.button>
                    </form>
                  </div>
                )}

                {/* Toggle */}
                <p className="text-center text-sm text-gray-400 mt-2">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => { setIsSignUp(!isSignUp); setErrors({}) }}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
              <p className="text-center text-xs text-gray-500 mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          )}

          {/* ── STEP 2: Type select / perks preview ──────────────────────── */}
          {step === 'type-select' && (
            <motion.div
              key="type-select"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white mb-3">Choose your path</h1>
                <p className="text-gray-400">Select the account type that best describes you</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Explorer card */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setUserType('explorer'); setStep('form') }}
                  className={`text-left p-7 rounded-3xl border transition-all ${userType === 'explorer'
                    ? 'bg-blue-600/15 border-blue-400/40'
                    : 'bg-white/[0.02] border-white/10 hover:border-blue-400/30 hover:bg-blue-600/5'
                    }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-5">
                    <Compass className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">Explorer</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Discover and follow independent creators. Get content tailored to your taste.
                  </p>
                  <ul className="space-y-2">
                    {explorerPerks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-2 text-blue-400 font-medium text-sm">
                    Get started free <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>

                {/* Creator card */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setUserType('creator'); setStep('form') }}
                  className={`text-left p-7 rounded-3xl border transition-all relative overflow-hidden ${userType === 'creator'
                    ? 'bg-amber-600/15 border-amber-400/40'
                    : 'bg-white/[0.02] border-white/10 hover:border-amber-400/30 hover:bg-amber-600/5'
                    }`}
                >
                  {/* badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">Creator</span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-5">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">Content Creator</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Host your content, grow an audience, and monetise your passion on indiVerse.
                  </p>
                  <ul className="space-y-2">
                    {creatorPerks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-amber-400" />
                        </div>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-2 text-amber-400 font-medium text-sm">
                    Apply as creator <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Sign-up form ─────────────────────────────────────── */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex items-center justify-center mx-auto mb-4"
                  >
                    <img src="/logo.png" alt="indiVerse" className="h-12 w-auto object-contain" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {userType === 'creator' ? 'Creator account' : 'Explorer account'}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {userType === 'creator'
                      ? 'Set up your creator profile'
                      : 'Start discovering amazing content'}
                  </p>
                </div>

                {/* Social */}
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-gray-500 uppercase">or email</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${userType === 'creator' ? 'focus:ring-amber-500/50' : 'focus:ring-blue-500/50'
                          } ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                    </div>
                    {errors.name && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.name}</motion.p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${userType === 'creator' ? 'focus:ring-amber-500/50' : 'focus:ring-blue-500/50'
                          } ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                    </div>
                    {errors.email && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.email}</motion.p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${userType === 'creator' ? 'focus:ring-amber-500/50' : 'focus:ring-blue-500/50'
                          } ${errors.password ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.password}</motion.p>}
                  </div>

                  {/* Creator-only fields */}
                  <AnimatePresence>
                    {userType === 'creator' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        {/* Creator handle */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Creator Handle</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">@</span>
                            <input
                              type="text"
                              value={formData.creatorHandle}
                              onChange={(e) => setFormData({ ...formData, creatorHandle: e.target.value.replace(/\s/g, '') })}
                              placeholder="yourcreatorname"
                              className={`w-full pl-9 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.creatorHandle ? 'border-red-500/50' : 'border-white/10'}`}
                            />
                          </div>
                          {errors.creatorHandle && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.creatorHandle}</motion.p>}
                        </div>

                        {/* Content category */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Content Category</label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <select
                              value={formData.contentCategory}
                              onChange={(e) => setFormData({ ...formData, contentCategory: e.target.value })}
                              className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none ${errors.contentCategory ? 'border-red-500/50' : 'border-white/10'}`}
                            >
                              <option value="" disabled className="bg-[#0a0a0f]">Select a category</option>
                              <option value="music" className="bg-[#0a0a0f]">🎵 Music</option>
                              <option value="film" className="bg-[#0a0a0f]">🎬 Film & Video</option>
                              <option value="art" className="bg-[#0a0a0f]">🎨 Art & Design</option>
                              <option value="podcast" className="bg-[#0a0a0f]">🎙️ Podcast</option>
                              <option value="gaming" className="bg-[#0a0a0f]">🎮 Gaming</option>
                              <option value="education" className="bg-[#0a0a0f]">📚 Education</option>
                              <option value="lifestyle" className="bg-[#0a0a0f]">✨ Lifestyle</option>
                              <option value="other" className="bg-[#0a0a0f]">🌐 Other</option>
                            </select>
                          </div>
                          {errors.contentCategory && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.contentCategory}</motion.p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Terms */}
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
                    {errors.terms && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">{errors.terms}</motion.p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${userType === 'creator'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-500/30'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/30'
                      }`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {userType === 'creator' ? 'Create Creator Account' : 'Create Explorer Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                  Already have an account?{' '}
                  <button
                    onClick={() => { setStep('auth-choice'); setIsSignUp(false); setErrors({}) }}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
