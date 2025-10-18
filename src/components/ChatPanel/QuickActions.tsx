import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import { ScenarioId } from '../../types';

interface QuickAction {
  id: ScenarioId;
  icon: string;
  label: string;
  query: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'drug-binding',
    icon: '🏥',
    label: 'Pfizer Drug Discovery',
    query: 'Calculate the binding energy of aspirin with COX-2 enzyme',
  },
  {
    id: 'reaction',
    icon: '🧪',
    label: 'BASF Process',
    query: 'Simulate methyl iodide reacting with sodium ethoxide at 50°C',
  },
  {
    id: 'materials',
    icon: '🔋',
    label: 'Tesla Materials',
    query: 'Calculate HOMO-LUMO gap for this organic solar cell molecule',
  },
];

export const QuickActions: React.FC = () => {
  const { startScenario, simulationPhase } = useDemoStore();

  const isDisabled = simulationPhase === 'processing';

  return (
    <div className="p-4 border-b border-rootchem-dark-700">
      <p className="text-sm text-gray-400 mb-3">Quick Templates:</p>
      <div className="grid grid-cols-3 gap-2">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: isDisabled ? 1 : 1.05, y: isDisabled ? 0 : -2 }}
            whileTap={{ scale: isDisabled ? 1 : 0.95 }}
            onClick={() => !isDisabled && startScenario(action.id)}
            disabled={isDisabled}
            className="glass-effect px-3 py-2 rounded-lg text-sm flex flex-col items-center justify-center space-y-1 hover:bg-rootchem-purple-600 hover:bg-opacity-20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs text-gray-300">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
