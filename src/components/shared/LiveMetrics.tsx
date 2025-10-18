import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';

export const LiveMetrics: React.FC = () => {
  const { simulationPhase, results } = useDemoStore();
  const [totalSimulations, setTotalSimulations] = useState(1247);
  const [timeSaved, setTimeSaved] = useState(0);
  const [costSaved, setCostSaved] = useState(0);

  useEffect(() => {
    // Increment counters when simulation completes
    if (simulationPhase === 'complete') {
      setTotalSimulations((prev) => prev + 1);
      setTimeSaved((prev) => prev + 336); // 14 days in hours
      setCostSaved((prev) => prev + 11850);
    }
  }, [simulationPhase]);

  // Animate total simulations count
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSimulations((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const isActive = simulationPhase !== 'idle';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed top-24 right-6 z-30 space-y-3"
        >
          {/* Total Simulations */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-4 w-64 border border-rootchem-purple-500 border-opacity-30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Simulations Today</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
            </div>
            <div className="text-3xl font-bold text-gradient">
              {totalSimulations.toLocaleString()}
            </div>
            <div className="text-xs text-green-400 mt-1">+{Math.floor(Math.random() * 5 + 2)} in last minute</div>
          </motion.div>

          {/* Time Saved */}
          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-4 w-64 border border-blue-500 border-opacity-30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Time Saved</span>
                <span className="text-lg">⚡</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {timeSaved.toLocaleString()} hrs
              </div>
              <div className="text-xs text-blue-300 mt-1">vs traditional methods</div>
              <div className="mt-2 pt-2 border-t border-blue-500 border-opacity-20">
                <div className="text-xs text-gray-400">
                  This simulation: <span className="text-white font-semibold">336 hours saved</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cost Saved */}
          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-4 w-64 border border-green-500 border-opacity-30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Cost Savings</span>
                <span className="text-lg">💰</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                ${costSaved.toLocaleString()}
              </div>
              <div className="text-xs text-green-300 mt-1">total saved this month</div>
              <div className="mt-2 pt-2 border-t border-green-500 border-opacity-20">
                <div className="text-xs text-gray-400">
                  This simulation: <span className="text-white font-semibold">$11,850 saved</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Expertise Required */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-4 w-64 border border-purple-500 border-opacity-30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Expertise Required</span>
              <span className="text-lg">🎓</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-red-400 line-through">PhD</div>
                <div className="text-xs text-gray-500">4-6 years</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div>
                <div className="text-sm text-green-400 font-semibold">Bachelor's</div>
                <div className="text-xs text-gray-400">Basic chemistry</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
