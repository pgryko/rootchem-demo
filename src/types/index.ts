export type ScenarioId = 'drug-binding' | 'reaction' | 'materials';

export type SimulationPhase = 'idle' | 'processing' | 'complete';

export type MessageRole = 'user' | 'assistant' | 'system';

export type TabType = 'summary' | 'energy' | 'structure' | 'export';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface SimulationStage {
  name: string;
  duration: number;
  progressStart: number;
  progressEnd: number;
  messages?: string[];
}

export interface TechnicalParams {
  method: string;
  basisSet: string;
  solvent: string;
  temperature?: number;
  charge?: number;
  multiplicity?: number;
}

export interface Metric {
  label: string;
  value: string;
  unit?: string;
  status?: 'success' | 'warning' | 'error';
}

export interface SimulationResults {
  primaryMetric: Metric;
  secondaryMetrics: Metric[];
  description: string;
  visualization: {
    moleculeData?: any;
    chartData?: any;
  };
  completionTime: number;
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  userQuery: string;
  stages: SimulationStage[];
  technicalParams: TechnicalParams;
  results: SimulationResults;
  timing: {
    typingDelay: number;
    stageTransitions: number[];
    totalDuration: number;
  };
}

export interface DemoState {
  // Current demo status
  currentScenario: Scenario | null;
  simulationPhase: SimulationPhase;

  // Chat state
  messages: Message[];
  isTyping: boolean;
  currentInput: string;

  // Simulation progress
  progress: number;
  currentStage: string;
  currentStageIndex: number;
  startTime: number | null;

  // Results data
  results: SimulationResults | null;

  // UI state
  activeTab: TabType;
  isFullscreen: boolean;
  moleculeRotation: { x: number; y: number; z: number };

  // Presenter controls
  isPresenterMode: boolean;
  autoAdvance: boolean;
  playbackSpeed: 1 | 1.5 | 2;
}

export interface DemoActions {
  // Scenario control
  startScenario: (scenarioId: ScenarioId) => void;
  resetDemo: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  skipToResults: () => void;

  // Chat actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (isTyping: boolean) => void;
  setCurrentInput: (input: string) => void;

  // Progress actions
  updateProgress: (progress: number) => void;
  setCurrentStage: (stage: string, index: number) => void;

  // Results actions
  setResults: (results: SimulationResults) => void;
  setActiveTab: (tab: TabType) => void;

  // UI actions
  toggleFullscreen: () => void;
  setMoleculeRotation: (rotation: { x: number; y: number; z: number }) => void;

  // Presenter actions
  togglePresenterMode: () => void;
  setAutoAdvance: (autoAdvance: boolean) => void;
  setPlaybackSpeed: (speed: 1 | 1.5 | 2) => void;
}

export type DemoStore = DemoState & DemoActions;
