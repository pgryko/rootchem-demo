import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatPanel } from './components/ChatPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
// import { ComparisonModal } from './components/shared/ComparisonModal';
// import { ROICalculator } from './components/shared/ROICalculator';
import { CompactMetricsBar } from './components/shared/CompactMetricsBar';
import { useSimulation, useRealSimulation, usePresenterMode } from './hooks';
import { useDemoStore } from './store/demoStore';
import { config } from './config';

function App() {
  const { isPresenterMode, playbackSpeed } = usePresenterMode();
  const { resetDemo } = useDemoStore();
  // const [showComparison, setShowComparison] = useState(false);
  // const [showROI, setShowROI] = useState(false);

  // Run simulation logic (real or simulated based on config)
  useSimulation(); // Always call simulated hook
  useRealSimulation(); // Real xtb hook will only run if USE_REAL_XTB is true

  // Auto-show ROI calculator when simulation completes
  // React.useEffect(() => {
  //   if (results && !showROI) {
  //     setTimeout(() => setShowROI(true), 1000);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [results]);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-rootchem-dark-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">⚛️</div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">root</span>
                <span className="text-gradient">chem</span>
              </h1>
              <p className="text-xs text-gray-400">AI-powered quantum chemistry simulations</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetDemo}
            className="px-4 py-2 glass-effect rounded-lg text-sm text-white hover:bg-rootchem-purple-600 hover:bg-opacity-20 transition-colors"
          >
            Reset Demo
          </motion.button>
        </div>
      </header>

      {/* Compact Metrics Bar - Removed per user request */}
      {/* <CompactMetricsBar /> */}

      {/* Main Demo Container */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          <ChatPanel />
          <VisualizationPanel />
        </div>
      </main>

      {/* Modals - Commented out for simplified version */}
      {/*
      <ComparisonModal isOpen={showComparison} onClose={() => setShowComparison(false)} />
      <ROICalculator
        isOpen={showROI}
        onClose={() => setShowROI(false)}
        simulationTime={currentScenario?.results.completionTime || 13}
        scenarioTitle={currentScenario?.title || ''}
      />
      */}

      {/* Presenter Mode Indicator */}
      <AnimatePresence>
        {isPresenterMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 glass-effect rounded-xl px-6 py-4 border border-rootchem-purple-500"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-rootchem-purple-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-semibold text-white">Presenter Mode Active</p>
                <p className="text-xs text-gray-400">Speed: {playbackSpeed}x</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-rootchem-dark-600 text-xs text-gray-400 space-y-1">
              <p>
                <kbd className="px-2 py-1 bg-rootchem-dark-700 rounded text-xs">R</kbd> Reset
              </p>
              <p>
                <kbd className="px-2 py-1 bg-rootchem-dark-700 rounded text-xs">S</kbd> Skip to
                Results
              </p>
              <p>
                <kbd className="px-2 py-1 bg-rootchem-dark-700 rounded text-xs">1/2/3</kbd> Change
                Speed
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-rootchem-dark-700 bg-rootchem-dark-900 bg-opacity-95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-xs text-gray-400">
          <p>© 2025 RootChem - AI-Powered Quantum Chemistry</p>
          <p>
            Press <kbd className="px-2 py-1 bg-rootchem-dark-700 rounded">⌘⇧P</kbd> for presenter
            mode
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
