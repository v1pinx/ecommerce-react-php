import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skull, Scroll, GhostIcon, Flame, Moon, Sparkles, Heart, CandlestickChart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glowAnimation = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ContactMethod = ({ icon: Icon, title, content }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    className="group flex items-center gap-4 p-6 bg-black/40 rounded-xl border border-red-900/30 hover:border-red-500/50 backdrop-blur-lg relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <motion.div 
      className="p-3 bg-red-950 rounded-xl relative"
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="w-6 h-6 text-red-500" />
    </motion.div>
    <div>
      <p className="font-serif font-semibold text-red-400">{title}</p>
      <p className="text-gray-400">{content}</p>
    </div>
  </motion.div>
);

const MagicalInput = ({ label, type, placeholder, value, onChange, Icon }) => (
  <div className="relative">
    <label className="block text-red-400 mb-2 font-serif">{label}</label>
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-10 bg-black/30 border border-red-900/30 rounded-xl focus:outline-none focus:border-red-500/50 text-gray-200 placeholder-gray-600 backdrop-blur-sm"
        placeholder={placeholder}
        required
      />
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors" />
    </div>
  </div>
);

export default function Darkness() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-red-950 to-black relative overflow-hidden py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              x: [Math.random() * 100, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-24 px-4"
      >
        <motion.div 
          {...glowAnimation}
          className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-purple-900/20 blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            {...floatingAnimation}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-red-500/20 mb-6 backdrop-blur-sm"
          >
            <Moon className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400">Enter the realm of darkness</span>
          </motion.div>
          
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-serif font-bold tracking-tight text-red-500 mb-6"
          >
            Summon Us
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-gray-400 font-serif"
          >
            Your message echoes through the shadows...
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-lg bg-black/30 p-8 rounded-2xl border border-red-900/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-purple-900/5" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="p-2 bg-red-950 rounded-xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Scroll className="w-6 h-6 text-red-500" />
                </motion.div>
                <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                  Write Your Dark Message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <MagicalInput
                  label="Your Name"
                  type="text"
                  placeholder="Speak thy name..."
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  Icon={GhostIcon}
                />
                
                <MagicalInput
                  label="Dark Mail"
                  type="email"
                  placeholder="Your mystical address..."
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  Icon={Skull}
                />
                
                <div className="relative">
                  <label className="block text-red-400 mb-2 font-serif">Your Message</label>
                  <div className="relative group">
                    <textarea
                      rows="4"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full p-3 pl-10 bg-black/30 border border-red-900/30 rounded-xl focus:outline-none focus:border-red-500/50 text-gray-200 placeholder-gray-600"
                      placeholder="Whisper your thoughts into the void..."
                      required
                    ></textarea>
                    <Flame className="absolute left-3 top-3 w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-3 bg-gradient-to-r from-red-900 to-purple-900 text-red-100 font-serif font-semibold rounded-xl transition flex items-center justify-center gap-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">
                    {isSubmitting ? "Casting spell..." : "Send to the Shadows"}
                  </span>
                  <CandlestickChart className="w-4 h-4 relative" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent mb-6">
                Other Ways to Reach the Darkness
              </h2>
            </motion.div>
            
            <ContactMethod
              icon={Skull}
              title="Mystical Line"
              content="+1 666 999 000"
            />
            
            <ContactMethod
              icon={GhostIcon}
              title="Ethereal Mail"
              content="darkportal@shadows.com"
            />
            
            <ContactMethod
              icon={Flame}
              title="Sacred Location"
              content="13 Crimson Avenue, Shadow Realm"
            />

            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 bg-black/40 backdrop-blur-lg rounded-2xl border border-red-900/30"
            >
              <h3 className="text-xl font-serif font-semibold text-red-400 mb-4">Dark Mysteries</h3>
              <div className="space-y-4">
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-400 group-hover:text-red-400 transition-colors">When do the shadows respond?</p>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-400 group-hover:text-red-400 transition-colors">How are dark messages delivered?</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}