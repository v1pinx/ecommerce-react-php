import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Stars, Sparkles, GhostIcon } from 'lucide-react';
import axios from "axios";
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

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

const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const MagicalInput = ({ label, type, value, onChange, Icon }) => (
  <div className="relative">
    <div className="relative group">
      <input
        type={type}
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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/'; // Pure localstorage vulnerability, I have to change it later
    }
  })

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/login.php`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('name', response.data.username);
      if (email == "admin@gmail.com") {
        localStorage.setItem('admin', true); // Vulnerable, I have to change it later
      }
      toast.success(response.data.message);

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response && error.response.status === 404) {
        toast.error("Missing fields");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden flex items-center justify-center">
      {/* Magical Particles */}
      <div className="fixed inset-0 opacity-40">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              x: [Math.random() * 100, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md px-4"
      >
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <motion.div
            {...floatingAnimation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
          >
            <Stars className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-serif">Welcome back!</span>
          </motion.div>


        </div>

        {/* Login Form */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl border border-purple-900/40 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-10 text-center"
          >
            Login
          </motion.h1>
          <form onSubmit={handleSubmit} className="relative space-y-6">
            <MagicalInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={Mail}
            />

            <MagicalInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                {isSubmitting ? "Logging in..." : "Login"}
              </span>
              <Sparkles className="w-5 h-5 relative" />
            </motion.button>
          </form>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center"
        >
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}