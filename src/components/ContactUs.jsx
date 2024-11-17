import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skull, Scroll, GhostIcon, Flame, Moon, Sparkles, Heart, CandlestickChart, Stars, Wand2 } from 'lucide-react';

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

const glowAnimation = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ContactMethod = ({ icon: Icon, title, content }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    className="group flex items-center gap-4 p-6 bg-black/50 rounded-xl border border-purple-900/40 hover:border-purple-500/50 backdrop-blur-xl relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <motion.div 
      className="p-3 bg-purple-950/80 rounded-xl relative"
      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <Icon className="w-6 h-6 text-purple-400" />
    </motion.div>
    <div>
      <p className="font-serif font-semibold text-purple-300">{title}</p>
      <p className="text-gray-400">{content}</p>
    </div>
  </motion.div>
);

const MagicalInput = ({ label, type, placeholder, value, onChange, Icon }) => (
  <div className="relative">
    <label className="block text-purple-300 mb-2 font-serif">{label}</label>
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-4 pl-12 bg-black/40 border border-purple-900/40 rounded-xl focus:outline-none focus:border-purple-500/50 text-gray-200 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
        placeholder={placeholder}
        required
      />
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/50 group-hover:text-purple-400 transition-colors duration-300" />
    </div>
  </div>
);

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden">
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

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-32 px-4"
      >
        <motion.div 
          {...glowAnimation}
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            {...floatingAnimation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 border border-purple-500/30 mb-8 backdrop-blur-xl"
          >
            <Stars className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-serif">We typically respond within 24 hours</span>
          </motion.div>
          
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-gray-400 font-serif"
          >
            Drop us a message, and we'll get back to you faster than you can say "awesome"!
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-black/40 p-10 rounded-2xl border border-purple-900/40 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="p-3 bg-purple-950/80 rounded-xl"
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Wand2 className="w-6 h-6 text-purple-400" />
                </motion.div>
                <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Send Us a Message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <MagicalInput
                  label="Your Name"
                  type="text"
                  placeholder="What should we call you?"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  Icon={GhostIcon}
                />
                
                <MagicalInput
                  label="Your Email"
                  type="email"
                  placeholder="Where can we reach you?"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  Icon={Skull}
                />
                
                <div className="relative">
                  <label className="block text-purple-300 mb-2 font-serif">Your Message</label>
                  <div className="relative group">
                    <textarea
                      rows="5"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full p-4 pl-12 bg-black/40 border border-purple-900/40 rounded-xl focus:outline-none focus:border-purple-500/50 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Tell us what's on your mind?"
                      required
                    ></textarea>
                    <Flame className="absolute left-4 top-4 w-5 h-5 text-purple-500/50 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-4 bg-gradient-to-r from-purple-900 to-blue-900 text-purple-100 font-serif font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <CandlestickChart className="w-5 h-5 relative" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
                Other Ways to Reach us
              </h2>
            </motion.div>
            
            <ContactMethod
              icon={Skull}
              title="Call or Text"
              content="+1 666 999 000"
            />
            
            <ContactMethod
              icon={GhostIcon}
              title="Email Us"
              content="support@square.com"
            />
            
            <ContactMethod
              icon={Flame}
              title="Visit Our Office"
              content="123 Tech Avenue, Innovation District"
            />

            <motion.div
              variants={itemVariants}
              className="mt-12 p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-purple-900/40"
            >
              <h3 className="text-xl font-serif font-semibold text-purple-300 mb-6">FAQ</h3>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-purple-400 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-gray-400 group-hover:text-purple-300 transition-colors duration-300">What are your support hours?</p>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-gray-400 group-hover:text-purple-300 transition-colors duration-300">How fast do you typically respond?</p>
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