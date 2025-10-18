import { create } from 'zustand';
import { DemoStore, Message, ScenarioId, SimulationResults, TabType } from '../types';
import { scenarios } from '../data/scenarios';

const initialState = {
  currentScenario: null,
  simulationPhase: 'idle' as const,
  messages: [],
  isTyping: false,
  currentInput: '',
  progress: 0,
  currentStage: '',
  currentStageIndex: 0,
  startTime: null,
  results: null,
  activeTab: 'summary' as TabType,
  isFullscreen: false,
  moleculeRotation: { x: 0, y: 0, z: 0 },
  isPresenterMode: false,
  autoAdvance: false,
  playbackSpeed: 1 as const,
};

export const useDemoStore = create<DemoStore>((set, get) => ({
  ...initialState,

  // Scenario control
  startScenario: (scenarioId: ScenarioId) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    set({
      currentScenario: scenario,
      simulationPhase: 'idle',
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hello! I'm your quantum chemistry assistant. What would you like to simulate today?",
          timestamp: Date.now(),
        },
      ],
      progress: 0,
      currentStage: '',
      currentStageIndex: 0,
      startTime: null,
      results: null,
      activeTab: 'summary',
    });

    // Add user message
    setTimeout(() => {
      get().addMessage({
        role: 'user',
        content: scenario.userQuery,
      });

      // Start typing indicator
      setTimeout(() => {
        get().setTyping(true);

        // Start processing after typing delay
        setTimeout(() => {
          get().setTyping(false);
          get().addMessage({
            role: 'assistant',
            content: `I'll help you with that. Let me set up the calculation for ${scenario.title}.`,
          });

          set({
            simulationPhase: 'processing',
            startTime: Date.now(),
            currentStage: scenario.stages[0].name,
            currentStageIndex: 0,
          });
        }, scenario.timing.typingDelay);
      }, 1000);
    }, 500);
  },

  resetDemo: () => {
    set(initialState);
  },

  pauseSimulation: () => {
    // Implementation for pause
  },

  resumeSimulation: () => {
    // Implementation for resume
  },

  skipToResults: () => {
    const { currentScenario } = get();
    if (!currentScenario) return;

    set({
      simulationPhase: 'complete',
      progress: 100,
      results: currentScenario.results,
    });

    get().addMessage({
      role: 'assistant',
      content: currentScenario.results.description,
    });
  },

  // Chat actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  setTyping: (isTyping: boolean) => {
    set({ isTyping });
  },

  setCurrentInput: (currentInput: string) => {
    set({ currentInput });
  },

  // Progress actions
  updateProgress: (progress: number) => {
    set({ progress });
  },

  setCurrentStage: (stage: string, index: number) => {
    set({ currentStage: stage, currentStageIndex: index });
  },

  // Results actions
  setResults: (results: SimulationResults) => {
    set({ results, simulationPhase: 'complete' });
  },

  setActiveTab: (activeTab: TabType) => {
    set({ activeTab });
  },

  // UI actions
  toggleFullscreen: () => {
    set((state) => ({ isFullscreen: !state.isFullscreen }));
  },

  setMoleculeRotation: (moleculeRotation) => {
    set({ moleculeRotation });
  },

  // Presenter actions
  togglePresenterMode: () => {
    set((state) => ({ isPresenterMode: !state.isPresenterMode }));
  },

  setAutoAdvance: (autoAdvance: boolean) => {
    set({ autoAdvance });
  },

  setPlaybackSpeed: (playbackSpeed: 1 | 1.5 | 2) => {
    set({ playbackSpeed });
  },
}));
