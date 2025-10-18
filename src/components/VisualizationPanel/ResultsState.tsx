import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import { TabType } from '../../types';

const tabs: { id: TabType; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'energy', label: 'Energy' },
  { id: 'structure', label: 'Structure' },
  { id: 'export', label: 'Export' },
];

export const ResultsState: React.FC = () => {
  const { results, activeTab, setActiveTab } = useDemoStore();

  if (!results) return null;

  return (
    <div className="flex flex-col h-full">
      {/* 3D Molecule Viewer Placeholder */}
      <div className="h-64 bg-gradient-to-br from-rootchem-dark-700 to-rootchem-dark-800 border-b border-rootchem-dark-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">⚛️</div>
            <p className="text-gray-400 text-sm">3D Molecule Viewer</p>
            <p className="text-gray-500 text-xs mt-1">(Three.js visualization would render here)</p>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-rootchem-dark-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-rootchem-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-rootchem-purple-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-2xl font-semibold text-white mb-4">Simulation Complete ✓</h4>
              <p className="text-gray-300 leading-relaxed">{results.description}</p>
            </div>

            {/* Primary Metric */}
            <div className="glass-effect rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">{results.primaryMetric.label}</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gradient">
                  {results.primaryMetric.value}
                </span>
                {results.primaryMetric.unit && (
                  <span className="text-xl text-gray-400 ml-2">{results.primaryMetric.unit}</span>
                )}
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {results.secondaryMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-4"
                >
                  <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                  <div className="flex items-baseline">
                    <span className="text-xl font-semibold text-white">{metric.value}</span>
                    {metric.unit && (
                      <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
                    )}
                  </div>
                  {metric.status && (
                    <div className="mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          metric.status === 'success'
                            ? 'bg-green-500 bg-opacity-20 text-green-400'
                            : metric.status === 'warning'
                            ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                            : 'bg-red-500 bg-opacity-20 text-red-400'
                        }`}
                      >
                        {metric.status}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'energy' && (
          <motion.div
            key="energy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Energy Profile</h4>
            <div className="glass-effect rounded-xl p-6 h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-sm">Energy diagram visualization</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'structure' && (
          <motion.div
            key="structure"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Molecular Structure</h4>
            <div className="glass-effect rounded-xl p-6">
              <p className="text-gray-300">Optimized geometry and structural parameters</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'export' && (
          <motion.div
            key="export"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Export Options</h4>
            <div className="space-y-2">
              {['PDF Report', 'CSV Data', 'PNG Image', 'PDB File'].map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass-effect rounded-lg p-4 text-left hover:bg-rootchem-purple-600 hover:bg-opacity-20 transition-colors flex items-center justify-between"
                >
                  <span className="text-white">{option}</span>
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
