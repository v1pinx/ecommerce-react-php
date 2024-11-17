import React from 'react';
import { motion } from 'framer-motion';

const MagicalBackground = () => {
  // Create orbital rings for additional visual effect
  const OrbitalRing = ({ delay = 0, duration = 20, size = 300, opacity = 0.1 }) => (
    <motion.div
      className="absolute rounded-full border border-purple-500/20"
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
        className="absolute w-3 h-3 bg-purple-400/20 rounded-full blur-sm"
        style={{
          top: -1.5,
          left: size / 2 - 1.5
        }}
      />
    </motion.div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitalRing size={200} duration={15} opacity={0.05} />
        <OrbitalRing size={400} duration={25} delay={1} opacity={0.03} />
        <OrbitalRing size={600} duration={35} delay={2} opacity={0.02} />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full blur-sm"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.5, 0.2],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default MagicalBackground;