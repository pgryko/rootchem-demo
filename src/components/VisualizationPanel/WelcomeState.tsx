import React from 'react';
import { motion } from 'framer-motion';

export const WelcomeState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="text-9xl"
        >
          ⚛️
        </motion.div>
      </motion.div>

      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-white mb-2"
      >
        Ready to Simulate
      </motion.h4>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-center max-w-md"
      >
        Select a template or describe your simulation using natural language
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 glass-effect rounded-xl p-6 max-w-md"
      >
        <p className="text-sm text-gray-300 mb-4">Example queries:</p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start">
            <span className="text-rootchem-purple-400 mr-2">→</span>
            <span>"Calculate binding energy of this drug to protein X"</span>
          </li>
          <li className="flex items-start">
            <span className="text-rootchem-purple-400 mr-2">→</span>
            <span>"Optimize geometry of this molecule"</span>
          </li>
          <li className="flex items-start">
            <span className="text-rootchem-purple-400 mr-2">→</span>
            <span>"Predict reaction pathway for A + B"</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
