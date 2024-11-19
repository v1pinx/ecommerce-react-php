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

const TermsSection = ({ title, children, icon: Icon }) => {
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

export default function TermsOfService() {
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
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-gray-400 font-serif"
          >
            Please read these terms carefully before using our services
          </motion.p>
        </div>
      </motion.div>

      {/* Terms Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 pb-32 space-y-8"
      >
        <TermsSection title="Welcome to Square" icon={Wand2}>
          <p>
            These Terms of Service govern your access to and use of Square's products and services.
            By accessing or using our services, you agree to be bound by these terms and our privacy policy.
            Please take the time to read them carefully.
          </p>
        </TermsSection>

        <TermsSection title="Account Responsibilities" icon={GhostIcon}>
          <p>As a Square account holder, you are responsible for:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Maintaining the security of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Ensuring your account information is accurate and up-to-date</li>
            <li>Reporting any unauthorized access or security breaches</li>
          </ul>
        </TermsSection>

        <TermsSection title="Privacy & Security" icon={Moon}>
          <p>We are committed to protecting your privacy and securing your data:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Implementation of industry-standard security measures</li>
            <li>Regular security assessments and updates</li>
            <li>Transparent data collection and processing practices</li>
            <li>User control over data sharing preferences</li>
          </ul>
        </TermsSection>

        <TermsSection title="Prohibited Activities" icon={Skull}>
          <div className="space-y-4">
            <p>The following activities are strictly prohibited:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Unauthorized access to our systems or other users' accounts</li>
              <li>Violation of intellectual property rights</li>
              <li>Distribution of malicious software or content</li>
              <li>Engaging in fraudulent or deceptive practices</li>
            </ul>
          </div>
        </TermsSection>

        <TermsSection title="Contact Information" icon={Flame}>
          <p>For questions or concerns about these terms, please contact us:</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">support@square.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">24/7 Customer Support</span>
            </div>
          </div>
        </TermsSection>

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
              {accepted ? 'Terms Accepted' : 'Accept Terms'}
            </span>
            <Stars className="w-5 h-5 relative" />
          </motion.button>
          <p className="text-sm text-gray-400">
            By clicking "Accept Terms", you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}