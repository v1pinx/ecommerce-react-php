import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scroll, Sparkles, Heart, Moon, Stars, Wand2, GhostIcon, Flame, Skull } from 'lucide-react';

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

const PrivacySection = ({ title, children, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group flex items-start gap-4 p-8 bg-black/50 rounded-xl border border-purple-900/40 hover:border-purple-500/50 backdrop-blur-xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <motion.div
        className="p-3 bg-purple-950/80 rounded-xl relative shrink-0"
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <Icon className="w-6 h-6 text-purple-400" />
      </motion.div>
      <div className="relative">
        <h2 className="text-xl font-serif font-semibold text-purple-300 mb-4">{title}</h2>
        <div className="text-gray-400 space-y-4">{children}</div>
      </div>
    </motion.div>
  );
};

export default function PrivacyPolicy() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
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
            <span className="text-sm text-purple-300 font-serif">Last Updated: November 2024</span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-serif font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-gray-400 font-serif"
          >
            We value your privacy and are committed to safeguarding your personal information.
          </motion.p>
        </div>
      </motion.div>

      {/* Privacy Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 pb-32 space-y-8"
      >
        <PrivacySection title="Data Collection" icon={Wand2}>
          <p>
            We collect personal information when you use our services, such as your name, email address, and usage data.
            This information helps us provide you with a better experience and improve our services.
          </p>
        </PrivacySection>

        <PrivacySection title="Data Usage" icon={GhostIcon}>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Enhance user experience and personalize content</li>
            <li>Communicate with you about updates, features, and offers</li>
            <li>Monitor the performance of our services</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="Data Sharing" icon={Moon}>
          <p>We respect your privacy and only share your data in the following circumstances:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>With trusted service providers who assist us in delivering our services</li>
            <li>When required by law or to protect our rights</li>
            <li>In the event of a business transfer or merger</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="Cookies" icon={Skull}>
          <div className="space-y-4">
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve your browsing experience</li>
              <li>Track website performance and analytics</li>
              <li>Enable personalized content</li>
            </ul>
          </div>
        </PrivacySection>

        <PrivacySection title="Security Measures" icon={Flame}>
          <p>We take security seriously and implement various measures to protect your data:</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Encryption of sensitive data</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Regular security audits</span>
            </div>
          </div>
        </PrivacySection>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center mt-16 space-y-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAccepted(true)}
            className="group relative w-full max-w-md py-4 bg-gradient-to-r from-purple-900 to-blue-900 text-purple-100 font-serif font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">
              {accepted ? 'Privacy Policy Accepted' : 'Accept Privacy Policy'}
            </span>
            <Stars className="w-5 h-5 relative" />
          </motion.button>
          <p className="text-gray-400 text-sm font-serif">
            By accepting, you agree to our privacy policy and terms.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
