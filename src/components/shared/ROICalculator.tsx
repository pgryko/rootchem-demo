import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ROICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  simulationTime: number; // in seconds
  scenarioTitle: string;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({
  isOpen,
  onClose,
  simulationTime,
  scenarioTitle,
}) => {
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [animatedTime, setAnimatedTime] = useState(0);

  const traditionalCost = 12000;
  const rootchemCost = 150;
  const savings = traditionalCost - rootchemCost;

  const traditionalTime = 14; // days
  const rootchemTime = simulationTime / 86400; // convert seconds to days
  const timeSaved = traditionalTime - rootchemTime;

  useEffect(() => {
    if (isOpen) {
      // Animate numbers counting up
      const duration = 1500;
      const steps = 60;
      const increment = savings / steps;
      const timeIncrement = timeSaved / steps;

      let current = 0;
      let currentTime = 0;

      const timer = setInterval(() => {
        current += increment;
        currentTime += timeIncrement;

        if (current >= savings) {
          setAnimatedSavings(savings);
          setAnimatedTime(timeSaved);
          clearInterval(timer);
        } else {
          setAnimatedSavings(Math.floor(current));
          setAnimatedTime(currentTime);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isOpen, savings, timeSaved]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-gradient-to-br from-rootchem-dark-800 to-rootchem-dark-900 rounded-2xl max-w-2xl w-full border-2 border-green-500 border-opacity-30 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-green-500 bg-opacity-10 border-b border-green-500 border-opacity-20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Cost Savings Analysis</h2>
                    <p className="text-sm text-gray-400">{scenarioTitle}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Comparison Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Traditional Approach</span>
                      <span className="text-sm font-semibold text-red-400">${traditionalCost.toLocaleString()}</span>
                    </div>
                    <div className="h-12 bg-rootchem-dark-700 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-end px-4"
                      >
                        <span className="text-white font-semibold text-sm">2 weeks</span>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">RootChem</span>
                      <span className="text-sm font-semibold text-green-400">${rootchemCost.toLocaleString()}</span>
                    </div>
                    <div className="h-12 bg-rootchem-dark-700 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(rootchemCost / traditionalCost) * 100}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-end px-4"
                      >
                        <span className="text-white font-semibold text-sm">{simulationTime}s</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Savings Display */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.6 }}
                    className="glass-effect rounded-xl p-6 border-2 border-green-500 border-opacity-30"
                  >
                    <div className="text-sm text-gray-400 mb-2">💰 Cost Savings</div>
                    <div className="text-4xl font-bold text-green-400">
                      ${animatedSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-300 mt-2">
                      {Math.round((savings / traditionalCost) * 100)}% reduction
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.7 }}
                    className="glass-effect rounded-xl p-6 border-2 border-blue-500 border-opacity-30"
                  >
                    <div className="text-sm text-gray-400 mb-2">⚡ Time Savings</div>
                    <div className="text-4xl font-bold text-blue-400">
                      {animatedTime.toFixed(2)}
                    </div>
                    <div className="text-xs text-blue-300 mt-2">days saved</div>
                  </motion.div>
                </div>

                {/* Breakdown */}
                <div className="glass-effect rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Cost Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Traditional Lab Equipment</span>
                      <span className="text-red-400">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expert Computational Chemist (2 weeks)</span>
                      <span className="text-red-400">$6,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">HPC Cluster Time</span>
                      <span className="text-red-400">$1,000</span>
                    </div>
                    <div className="border-t border-rootchem-dark-600 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">RootChem Simulation</span>
                        <span className="text-green-400">$150</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Annual Projection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-rootchem-purple-600 to-rootchem-purple-700 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-purple-200 mb-1">Annual Savings (50 simulations/year)</div>
                      <div className="text-3xl font-bold text-white">
                        ${(savings * 50).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-5xl">🚀</div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-rootchem-dark-900 border-t border-rootchem-dark-700 flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  * Based on industry averages for computational chemistry costs
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-rootchem-purple-600 hover:bg-rootchem-purple-700 rounded-lg text-white font-semibold transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
