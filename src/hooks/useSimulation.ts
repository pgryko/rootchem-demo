import { useEffect, useRef } from 'react';
import { useDemoStore } from '../store/demoStore';

export const useSimulation = () => {
  const {
    currentScenario,
    simulationPhase,
    progress,
    currentStageIndex,
    playbackSpeed,
    updateProgress,
    setCurrentStage,
    setResults,
    addMessage,
  } = useDemoStore();

  const stageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (simulationPhase !== 'processing' || !currentScenario) {
      return;
    }

    const stages = currentScenario.stages;
    const currentStage = stages[currentStageIndex];

    if (!currentStage) {
      // All stages complete
      setResults(currentScenario.results);
      addMessage({
        role: 'assistant',
        content: currentScenario.results.description,
      });
      return;
    }

    // Clear existing timers
    if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    // Update current stage
    setCurrentStage(currentStage.name, currentStageIndex);

    // Add stage messages if any
    if (currentStage.messages && currentStage.messages.length > 0) {
      currentStage.messages.forEach((msg, index) => {
        setTimeout(() => {
          addMessage({
            role: 'system',
            content: msg,
          });
        }, (index * 500) / playbackSpeed);
      });
    }

    // Animate progress
    const { progressStart, progressEnd, duration } = currentStage;
    const progressRange = progressEnd - progressStart;
    const updateInterval = 50; // Update every 50ms
    const totalUpdates = (duration / playbackSpeed) / updateInterval;
    const progressIncrement = progressRange / totalUpdates;

    let currentProgress = progressStart;

    progressTimerRef.current = setInterval(() => {
      currentProgress += progressIncrement;
      if (currentProgress >= progressEnd) {
        currentProgress = progressEnd;
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      }
      updateProgress(Math.min(currentProgress, 100));
    }, updateInterval);

    // Move to next stage after duration
    stageTimerRef.current = setTimeout(() => {
      if (currentStageIndex < stages.length - 1) {
        setCurrentStage(stages[currentStageIndex + 1].name, currentStageIndex + 1);
      }
    }, duration / playbackSpeed);

    return () => {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [
    simulationPhase,
    currentScenario,
    currentStageIndex,
    playbackSpeed,
    updateProgress,
    setCurrentStage,
    setResults,
    addMessage,
  ]);

  return {
    isRunning: simulationPhase === 'processing',
    progress,
    currentStageName: currentScenario?.stages[currentStageIndex]?.name,
  };
};
