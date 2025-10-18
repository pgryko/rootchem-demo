import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';

export const CompactMetricsBar: React.FC = () => {
  const { simulationPhase, results } = useDemoStore();
  const [totalSimulations, setTotalSimulations] = useState(1247);
  const [timeSaved, setTimeSaved] = useState(336);
  const [costSaved, setCostSaved] = useState(11850);

  useEffect(() => {
    // Increment counters when simulation completes
    if (simulationPhase === 'complete') {
      setTotalSimulations((prev) => prev + 1);
      setTimeSaved((prev) => prev + 336);
      setCostSaved((prev) => prev + 11850);
    }
  }, [simulationPhase]);

  // Slowly increment total simulations in background
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSimulations((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const isActive = simulationPhase !== 'idle';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-b border-rootchem-dark-700 bg-rootchem-dark-800 bg-opacity-50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-center space-x-8 text-sm">
              {/* Simulations */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">🔄</span>
                <span className="text-white font-semibold">
                  {totalSimulations.toLocaleString()}
                </span>
                <span className="text-gray-500">sims today</span>
              </div>

              {/* Time Saved */}
              {results && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-blue-400">⚡</span>
                  <span className="text-white font-semibold">{timeSaved}h</span>
                  <span className="text-gray-500">saved</span>
                </motion.div>
              )}

              {/* Cost Saved */}
              {results && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-green-400">💰</span>
                  <span className="text-white font-semibold">
                    ${costSaved.toLocaleString()}
                  </span>
                  <span className="text-gray-500">saved</span>
                </motion.div>
              )}

              {/* Expertise */}
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">🎓</span>
                <span className="text-red-400 line-through text-xs">PhD</span>
                <span className="text-gray-500">→</span>
                <span className="text-green-400 text-xs font-semibold">Bachelor's</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
