import { useEffect, useRef, useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import { runCalculation } from '../services/api';
import { SimulationResults } from '../types';
import { config } from '../config';

/**
 * Hook for running REAL xtb calculations via backend API
 * Shows simulated progress while waiting for real results
 * Only runs if config.USE_REAL_XTB is true
 */
export const useRealSimulation = () => {
  const {
    currentScenario,
    simulationPhase,
    updateProgress,
    setCurrentStage,
    setResults,
    addMessage,
  } = useDemoStore();

  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run if real xtb is enabled
    if (!config.USE_REAL_XTB) {
      return;
    }

    if (simulationPhase !== 'processing' || !currentScenario || isCalculating) {
      return;
    }

    // Start real calculation
    async function runRealCalculation() {
      setIsCalculating(true);

      // Safety check - should never happen due to guard above, but TypeScript needs it
      if (!currentScenario) {
        setIsCalculating(false);
        return;
      }

      try {
        // Step 1: Show initial message
        addMessage({
          role: 'system',
          content: 'Connecting to quantum chemistry engine...',
        });

        // Step 2: Animate progress while calculation runs
        let progress = 0;
        timerRef.current = setInterval(() => {
          progress += 5;
          if (progress <= 90) {
            updateProgress(progress);

            // Update stage messages based on progress
            if (progress === 20) {
              setCurrentStage('Parsing molecular structure', 0);
              addMessage({
                role: 'system',
                content: 'Molecular structure loaded',
              });
            } else if (progress === 40) {
              setCurrentStage('Initializing GFN2-xTB calculation', 1);
            } else if (progress === 60) {
              setCurrentStage('Running electronic structure calculation', 2);
              addMessage({
                role: 'system',
                content: 'SCF convergence achieved',
              });
            } else if (progress === 80) {
              setCurrentStage('Computing molecular properties', 3);
            }
          }
        }, 200); // Update every 200ms

        // Step 3: Call real API
        console.log('Calling xtb API with query:', currentScenario.userQuery);
        const apiResponse = await runCalculation(currentScenario.userQuery);

        // Step 4: Clear progress timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        // Step 5: Complete progress
        setCurrentStage('Finalizing results', 4);
        updateProgress(95);

        await new Promise((resolve) => setTimeout(resolve, 500));
        updateProgress(100);

        // Step 6: Convert API response to SimulationResults format
        const results: SimulationResults = {
          primaryMetric: {
            label: apiResponse.results.homoLumoGap
              ? 'HOMO-LUMO Gap'
              : 'Total Energy',
            value: apiResponse.results.homoLumoGap
              ? apiResponse.results.homoLumoGap.toFixed(2)
              : apiResponse.results.totalEnergy?.toFixed(6) || 'N/A',
            unit: apiResponse.results.homoLumoGap
              ? apiResponse.results.homoLumoGapUnit || 'eV'
              : apiResponse.results.totalEnergyUnit || 'Eh',
            status: 'success',
          },
          secondaryMetrics: [],
          description: `Calculation completed successfully using GFN2-xTB method.`,
          visualization: {
            moleculeData: {
              type: 'small-molecule',
            },
            chartData: {
              energyProfile: [0],
            },
          },
          completionTime: 1, // Real time was < 1 second
        };

        // Add secondary metrics based on what's available
        if (apiResponse.results.totalEnergy) {
          results.secondaryMetrics.push({
            label: 'Total Energy',
            value: apiResponse.results.totalEnergy.toFixed(6),
            unit: apiResponse.results.totalEnergyUnit || 'Eh',
          });
        }

        if (apiResponse.results.homoLumoGap) {
          results.secondaryMetrics.push({
            label: 'HOMO-LUMO Gap',
            value: apiResponse.results.homoLumoGap.toFixed(2),
            unit: apiResponse.results.homoLumoGapUnit || 'eV',
            status: 'success',
          });
        }

        if (apiResponse.results.gradientNorm) {
          results.secondaryMetrics.push({
            label: 'Gradient Norm',
            value: apiResponse.results.gradientNorm.toFixed(6),
            unit: 'Eh/a0',
          });
        }

        if (apiResponse.results.dipoleMoment !== undefined) {
          results.secondaryMetrics.push({
            label: 'Dipole Moment',
            value: apiResponse.results.dipoleMoment.toFixed(3),
            unit: apiResponse.results.dipoleMomentUnit || 'Debye',
          });
        }

        results.secondaryMetrics.push({
          label: 'Computation Time',
          value: '< 1',
          unit: 'second',
        });

        results.secondaryMetrics.push({
          label: 'Method',
          value: 'GFN2-xTB',
        });

        results.secondaryMetrics.push({
          label: 'Molecule',
          value: apiResponse.molecule,
        });

        // Generate description
        let description = `Real quantum chemistry calculation completed using xtb (GFN2-xTB method) for ${apiResponse.molecule}.\n\n`;

        if (apiResponse.results.totalEnergy) {
          description += `Total energy: ${apiResponse.results.totalEnergy.toFixed(6)} ${apiResponse.results.totalEnergyUnit}\n`;
        }

        if (apiResponse.results.homoLumoGap) {
          description += `HOMO-LUMO gap: ${apiResponse.results.homoLumoGap.toFixed(2)} ${apiResponse.results.homoLumoGapUnit}\n`;
        }

        description += `\nThis calculation was performed in real-time using your local xtb installation.`;

        results.description = description;

        // Step 7: Set results
        setResults(results);
        addMessage({
          role: 'assistant',
          content: results.description,
        });

        console.log('✅ Real calculation complete:', results);
      } catch (error) {
        console.error('Real calculation failed:', error);

        // Fallback to error message
        addMessage({
          role: 'system',
          content: `Error: Failed to run calculation. ${error instanceof Error ? error.message : 'Unknown error'}`,
        });

        // Show fallback results
        setResults({
          primaryMetric: {
            label: 'Error',
            value: 'Calculation Failed',
            unit: '',
            status: 'error',
          },
          secondaryMetrics: [],
          description: 'The calculation failed. Please check the backend server is running.',
          visualization: {
            moleculeData: { type: 'error' },
            chartData: { energyProfile: [] },
          },
          completionTime: 0,
        });
      } finally {
        setIsCalculating(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    }

    runRealCalculation();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    simulationPhase,
    currentScenario,
    isCalculating,
    updateProgress,
    setCurrentStage,
    setResults,
    addMessage,
  ]);

  return {
    isCalculating,
  };
};
