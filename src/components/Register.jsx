import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Stars, Sparkles, GhostIcon, Moon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Orbital background animation
const OrbitalRing = ({ delay = 0, duration = 20, size = 300, opacity = 0.1 }) => (
  <motion.div
    className="absolute rounded-full border border-purple-500"
    style={{
      width: size,
      height: size,
      opacity: opacity
    }}
    animate={{
      rotate: 360
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <motion.div
      className="absolute w-3 h-3 bg-purple-400 rounded-full blur-sm"
      style={{
        top: -1.5,
        left: size / 2 - 1.5
      }}
    />
  </motion.div>
);

const MagicalInput = ({ label, type, name, value, onChange, Icon }) => (
  <div className="relative">
    <div className="relative group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full p-4 pl-12 bg-black/40 border border-purple-900/40 rounded-xl focus:outline-none focus:border-purple-500/50 text-gray-200 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
        placeholder={label}
      />
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/50 group-hover:text-purple-400 transition-colors duration-300" />
    </div>
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Registration successful.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (response.status === 409) {
        toast.error('User already exists. Please try again.');
      }
      else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden flex items-center justify-center">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md px-4"
      >
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
          >
            <Moon className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-serif">Join our magical store</span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
          >
            Create Account
          </motion.h1>
        </div>

        {/* Registration Form */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl border border-purple-900/40 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <form onSubmit={handleSubmit} className="relative space-y-6">
            <MagicalInput
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              Icon={User}
            />

            <MagicalInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              Icon={Mail}
            />

            <MagicalInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              Icon={Lock}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full py-4 bg-gradient-to-r from-purple-900 to-blue-900 text-purple-100 font-serif font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </span>
              <Sparkles className="w-5 h-5 relative" />
            </motion.button>
          </form>
        </motion.div>

        {/* Login Link */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Log in
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}