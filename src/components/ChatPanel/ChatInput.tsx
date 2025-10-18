import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';

export const ChatInput: React.FC = () => {
  const { currentInput, setCurrentInput, simulationPhase } = useDemoStore();

  const isDisabled = simulationPhase === 'processing';

  return (
    <div className="p-4 border-t border-rootchem-dark-700">
      <div className="flex items-center space-x-2 glass-effect rounded-2xl px-4 py-3">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Type your request..."
          disabled={isDisabled}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 disabled:opacity-50"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-rootchem-purple-600 transition-colors disabled:opacity-50"
          disabled={isDisabled}
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
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-rootchem-purple-600 transition-colors disabled:opacity-50"
          disabled={isDisabled}
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
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-rootchem-purple-600 rounded-full hover:bg-rootchem-purple-700 transition-colors disabled:opacity-50"
          disabled={isDisabled || !currentInput.trim()}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};
