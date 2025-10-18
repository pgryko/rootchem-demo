import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-rootchem-dark-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-rootchem-purple-500">
              {/* Header */}
              <div className="p-6 border-b border-rootchem-dark-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Traditional vs RootChem</h2>
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

              {/* Content */}
              <div className="grid grid-cols-2 divide-x divide-rootchem-dark-700 overflow-y-auto max-h-[calc(90vh-100px)]">
                {/* Traditional Approach */}
                <div className="p-6 bg-red-950 bg-opacity-20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-red-400">Traditional Approach</h3>
                    <span className="text-xs bg-red-500 bg-opacity-20 text-red-400 px-3 py-1 rounded-full">
                      Expert Only
                    </span>
                  </div>

                  {/* Terminal Simulation */}
                  <div className="bg-black rounded-lg p-4 mb-6 font-mono text-xs overflow-hidden">
                    <div className="text-green-400 mb-2">$ module load gaussian/16</div>
                    <div className="text-green-400 mb-2">$ vi input.gjf</div>
                    <div className="text-gray-500 mb-4">
                      {`# Complex input file editing...
%mem=16GB
%nprocshared=8
#p B3LYP/6-31G(d) opt freq

Molecule calculation

0 1
C    0.0000    0.0000    0.0000
H    1.0890    0.0000    0.0000
...`}
                    </div>
                    <div className="text-green-400 mb-2">$ g16 {'<'} input.gjf {'>'} output.log</div>
                    <div className="text-yellow-400 mb-2">Submitted batch job 123456</div>
                    <div className="text-gray-500">$ tail -f output.log</div>
                    <div className="text-gray-500 animate-pulse">Waiting for cluster resources...</div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-4">
                    <div className="glass-effect rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-red-300 mb-2">Requirements:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>PhD-level expertise in computational chemistry</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Linux command line proficiency</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Understanding of quantum mechanics</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Manual server cluster management</span>
                        </li>
                      </ul>
                    </div>

                    <div className="glass-effect rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-red-300 mb-2">Typical Timeline:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>Learning curve: <span className="text-red-400 font-semibold">2-3 years</span></li>
                        <li>Setup per job: <span className="text-red-400 font-semibold">2-4 hours</span></li>
                        <li>Queue wait time: <span className="text-red-400 font-semibold">Hours-Days</span></li>
                        <li>Debugging errors: <span className="text-red-400 font-semibold">Days-Weeks</span></li>
                      </ul>
                    </div>

                    <div className="glass-effect rounded-lg p-4 border border-red-500 border-opacity-30">
                      <h4 className="text-sm font-semibold text-red-300 mb-2">Cost per Simulation:</h4>
                      <div className="text-3xl font-bold text-red-400">$5,000 - $15,000</div>
                      <p className="text-xs text-gray-400 mt-1">Including compute time + expert salary</p>
                    </div>
                  </div>
                </div>

                {/* RootChem Approach */}
                <div className="p-6 bg-green-950 bg-opacity-20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-green-400">RootChem Approach</h3>
                    <span className="text-xs bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full">
                      Anyone Can Use
                    </span>
                  </div>

                  {/* Natural Language Interface */}
                  <div className="glass-effect rounded-lg p-4 mb-6">
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold mr-3">
                        U
                      </div>
                      <div className="flex-1 bg-rootchem-purple-600 rounded-2xl px-4 py-3">
                        <p className="text-white text-sm">
                          Calculate the binding energy of aspirin with COX-2 enzyme
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rootchem-purple-500 to-rootchem-purple-700 flex items-center justify-center text-white text-sm font-semibold mr-3">
                        AI
                      </div>
                      <div className="flex-1 glass-effect rounded-2xl px-4 py-3">
                        <p className="text-white text-sm">
                          I'll help you with that. Running the calculation now...
                        </p>
                        <div className="mt-3 bg-rootchem-dark-700 rounded-lg p-3">
                          <div className="text-xs text-green-400 mb-2">✓ Calculation complete in 13 seconds</div>
                          <div className="text-lg font-bold text-gradient">Binding Energy: -8.2 kcal/mol</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    <div className="glass-effect rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-300 mb-2">Requirements:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Basic chemistry knowledge (Bachelor's level)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Ability to type in plain English</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Web browser (that's it!)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Automatic infrastructure management</span>
                        </li>
                      </ul>
                    </div>

                    <div className="glass-effect rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-300 mb-2">Typical Timeline:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>Learning curve: <span className="text-green-400 font-semibold">5 minutes</span></li>
                        <li>Setup per job: <span className="text-green-400 font-semibold">30 seconds</span></li>
                        <li>Queue wait time: <span className="text-green-400 font-semibold">Instant</span></li>
                        <li>Debugging errors: <span className="text-green-400 font-semibold">AI-assisted</span></li>
                      </ul>
                    </div>

                    <div className="glass-effect rounded-lg p-4 border border-green-500 border-opacity-30">
                      <h4 className="text-sm font-semibold text-green-300 mb-2">Cost per Simulation:</h4>
                      <div className="text-3xl font-bold text-green-400">$50 - $200</div>
                      <p className="text-xs text-gray-400 mt-1">All-inclusive SaaS pricing</p>
                      <div className="mt-3 pt-3 border-t border-green-500 border-opacity-20">
                        <p className="text-xs text-green-300">
                          <span className="font-semibold">Savings:</span> $4,800 - $14,800 per simulation
                        </p>
                        <p className="text-xs text-green-300">
                          <span className="font-semibold">Time saved:</span> 95% faster
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-rootchem-dark-700 bg-rootchem-dark-900 text-center">
                <p className="text-sm text-gray-400">
                  Making quantum chemistry accessible to <span className="text-rootchem-purple-400 font-semibold">20 million</span> chemists worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
