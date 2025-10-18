import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import { WelcomeState } from './WelcomeState';
import { ProcessingState } from './ProcessingState';
import { ResultsState } from './ResultsState';

export const VisualizationPanel: React.FC = () => {
  const { simulationPhase, toggleFullscreen, isFullscreen } = useDemoStore();

  return (
    <div className="flex flex-col h-full bg-rootchem-dark-900 rounded-r-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-rootchem-dark-700 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Simulation Workspace</h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="p-2 glass-effect rounded-lg hover:bg-rootchem-purple-600 hover:bg-opacity-20 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isFullscreen
                    ? 'M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25'
                    : 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
                }
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {simulationPhase === 'idle' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <WelcomeState />
            </motion.div>
          )}

          {simulationPhase === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              <ProcessingState />
            </motion.div>
          )}

          {simulationPhase === 'complete' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <ResultsState />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
