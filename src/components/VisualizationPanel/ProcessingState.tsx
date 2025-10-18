import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';

export const ProcessingState: React.FC = () => {
  const { progress, currentStage, currentScenario } = useDemoStore();
  const [showParams, setShowParams] = useState(false);

  const technicalParams = currentScenario?.technicalParams;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-8">
      {/* Animated Molecule Loader */}
      <div className="relative w-32 h-32">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-full bg-rootchem-purple-500"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-12px',
              marginTop: '-12px',
            }}
            animate={{
              x: [0, Math.cos((i * 2 * Math.PI) / 3) * 40, 0],
              y: [0, Math.sin((i * 2 * Math.PI) / 3) * 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full bg-gradient-to-br from-rootchem-purple-400 to-rootchem-purple-600"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        <motion.h4
          key={currentStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-white"
        >
          {currentStage || 'Processing Request...'}
        </motion.h4>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-2">
        <div className="h-2 bg-rootchem-dark-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rootchem-purple-500 to-rootchem-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{Math.round(progress)}%</span>
          <span>
            Stage {currentScenario ? useDemoStore.getState().currentStageIndex + 1 : 0} of{' '}
            {currentScenario?.stages.length || 0}
          </span>
        </div>
      </div>

      {/* Technical Details - Collapsible */}
      {technicalParams && (
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowParams(!showParams)}
            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <motion.span
              animate={{ rotate: showParams ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▸
            </motion.span>
            <span>
              {technicalParams.method} | {technicalParams.solvent}
            </span>
          </button>

          <AnimatePresence>
            {showParams && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-effect rounded-lg p-4 mt-3">
                  <dl className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Method:</dt>
                      <dd className="text-white font-mono">{technicalParams.method}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Basis Set:</dt>
                      <dd className="text-white font-mono">{technicalParams.basisSet}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Solvent:</dt>
                      <dd className="text-white font-mono">{technicalParams.solvent}</dd>
                    </div>
                    {technicalParams.temperature && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Temperature:</dt>
                        <dd className="text-white font-mono">{technicalParams.temperature} K</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
