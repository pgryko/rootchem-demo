import { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'drug-binding',
    title: 'Pfizer Drug Discovery Workflow',
    userQuery: 'Calculate molecular properties and HOMO-LUMO gap for aspirin',
    stages: [
      {
        name: 'Parsing molecular structure',
        duration: 2000,
        progressStart: 0,
        progressEnd: 25,
        messages: ['Loading aspirin structure...', 'Molecular structure loaded'],
      },
      {
        name: 'Initializing GFN2-xTB calculation',
        duration: 3000,
        progressStart: 25,
        progressEnd: 40,
        messages: ['Setting up quantum chemistry calculation...'],
      },
      {
        name: 'Running electronic structure calculation',
        duration: 4000,
        progressStart: 40,
        progressEnd: 70,
        messages: ['Computing molecular orbitals...', 'SCF convergence achieved'],
      },
      {
        name: 'Computing molecular properties',
        duration: 3000,
        progressStart: 70,
        progressEnd: 90,
        messages: ['Calculating HOMO-LUMO gap...', 'Computing dipole moment...'],
      },
      {
        name: 'Finalizing results',
        duration: 1000,
        progressStart: 90,
        progressEnd: 100,
      },
    ],
    technicalParams: {
      method: 'GFN2-xTB',
      basisSet: 'N/A (tight-binding)',
      solvent: 'None (gas phase)',
      temperature: 298,
    },
    results: {
      primaryMetric: {
        label: 'HOMO-LUMO Gap',
        value: '4.85',
        unit: 'eV',
        status: 'success',
      },
      secondaryMetrics: [
        {
          label: 'Total Energy',
          value: '-39.06',
          unit: 'Eh',
        },
        {
          label: 'Dipole Moment',
          value: '3.12',
          unit: 'Debye',
        },
        {
          label: 'Computation Time',
          value: '< 1',
          unit: 'second',
        },
      ],
      description:
        'Aspirin exhibits a HOMO-LUMO gap of 4.85 eV, indicating good electronic stability. The molecular properties computed using GFN2-xTB provide insights for drug discovery applications, including reactivity prediction and pharmacokinetic modeling.',
      visualization: {
        moleculeData: {
          type: 'small-molecule',
        },
        chartData: {
          energyProfile: [0],
        },
      },
      completionTime: 1,
    },
    timing: {
      typingDelay: 1500,
      stageTransitions: [2000, 3000, 4000, 3000, 1000],
      totalDuration: 13000,
    },
  },
  {
    id: 'reaction',
    title: 'BASF Process Optimization',
    userQuery: 'Simulate methyl iodide reacting with sodium ethoxide at 50°C',
    stages: [
      {
        name: 'Identifying reactants',
        duration: 1500,
        progressStart: 0,
        progressEnd: 20,
        messages: ['Methyl iodide (CH₃I) identified', 'Sodium ethoxide (NaOEt) identified'],
      },
      {
        name: 'Setting up reaction conditions',
        duration: 2000,
        progressStart: 20,
        progressEnd: 35,
        messages: ['Temperature: 323 K (50°C)', 'Solvent: Ethanol'],
      },
      {
        name: 'Locating transition state',
        duration: 4000,
        progressStart: 35,
        progressEnd: 60,
        messages: ['Searching for SN2 transition state...', 'Transition state located'],
      },
      {
        name: 'Computing reaction pathway',
        duration: 3500,
        progressStart: 60,
        progressEnd: 85,
        messages: ['Calculating IRC pathway...', 'Verifying product formation...'],
      },
      {
        name: 'Calculating thermodynamics',
        duration: 2000,
        progressStart: 85,
        progressEnd: 100,
        messages: ['Computing ΔG, ΔH, ΔS...'],
      },
    ],
    technicalParams: {
      method: 'DFT/B3LYP',
      basisSet: '6-31G(d)',
      solvent: 'Ethanol (PCM)',
      temperature: 323,
    },
    results: {
      primaryMetric: {
        label: 'Reaction Energy',
        value: '-201.5',
        unit: 'kJ/mol',
        status: 'success',
      },
      secondaryMetrics: [
        {
          label: 'Activation Barrier',
          value: '89.3',
          unit: 'kJ/mol',
        },
        {
          label: 'Reaction Type',
          value: 'SN2 Substitution',
        },
        {
          label: 'Product',
          value: 'Ethyl methyl ether',
        },
        {
          label: 'Computation Time',
          value: '13',
          unit: 'seconds',
        },
      ],
      description:
        'The SN2 reaction between methyl iodide and sodium ethoxide is highly exergonic with ΔG = -201.5 kJ/mol. The reaction proceeds through a classic backside attack mechanism with an activation barrier of 89.3 kJ/mol, forming ethyl methyl ether as the product.',
      visualization: {
        moleculeData: {
          reactants: ['CH3I', 'NaOEt'],
          products: ['CH3OCH2CH3', 'NaI'],
        },
        chartData: {
          energyProfile: [0, 45, 89.3, 15, -201.5],
        },
      },
      completionTime: 13,
    },
    timing: {
      typingDelay: 1500,
      stageTransitions: [1500, 2000, 4000, 3500, 2000],
      totalDuration: 13000,
    },
  },
  {
    id: 'materials',
    title: 'Tesla Battery Material Research',
    userQuery: 'Calculate HOMO-LUMO gap for this organic solar cell molecule',
    stages: [
      {
        name: 'Optimizing geometry',
        duration: 3000,
        progressStart: 0,
        progressEnd: 30,
        messages: ['Running geometry optimization...', 'Converged to stable structure'],
      },
      {
        name: 'Calculating molecular orbitals',
        duration: 3500,
        progressStart: 30,
        progressEnd: 55,
        messages: ['Computing frontier orbitals...', 'HOMO and LUMO identified'],
      },
      {
        name: 'Computing electronic properties',
        duration: 3000,
        progressStart: 55,
        progressEnd: 80,
        messages: ['Calculating band gap...', 'Analyzing charge distribution...'],
      },
      {
        name: 'Analyzing band structure',
        duration: 2500,
        progressStart: 80,
        progressEnd: 100,
        messages: ['Predicting optical properties...'],
      },
    ],
    technicalParams: {
      method: 'TD-DFT/CAM-B3LYP',
      basisSet: '6-311G(d,p)',
      solvent: 'None (gas phase)',
      temperature: 298,
    },
    results: {
      primaryMetric: {
        label: 'HOMO-LUMO Gap',
        value: '2.34',
        unit: 'eV',
        status: 'success',
      },
      secondaryMetrics: [
        {
          label: 'HOMO Energy',
          value: '-5.12',
          unit: 'eV',
        },
        {
          label: 'LUMO Energy',
          value: '-2.78',
          unit: 'eV',
        },
        {
          label: 'Absorption λmax',
          value: '530',
          unit: 'nm',
        },
        {
          label: 'Predicted Efficiency',
          value: '12.3',
          unit: '%',
          status: 'success',
        },
        {
          label: 'Computation Time',
          value: '12',
          unit: 'seconds',
        },
      ],
      description:
        'The organic semiconductor exhibits a HOMO-LUMO gap of 2.34 eV, corresponding to absorption in the green region (530 nm). The frontier orbital energies are well-matched for photovoltaic applications, with predicted power conversion efficiency of 12.3%. This makes it a promising candidate for organic solar cell development.',
      visualization: {
        moleculeData: {
          smiles: 'C1=CC=C2C(=C1)C(=O)C3=C(C2=O)C=CC=C3',
          orbitalData: {
            HOMO: [-5.12],
            LUMO: [-2.78],
          },
        },
        chartData: {
          absorptionSpectrum: [
            { wavelength: 400, intensity: 0.3 },
            { wavelength: 500, intensity: 0.8 },
            { wavelength: 530, intensity: 1.0 },
            { wavelength: 600, intensity: 0.5 },
          ],
        },
      },
      completionTime: 12,
    },
    timing: {
      typingDelay: 1500,
      stageTransitions: [3000, 3500, 3000, 2500],
      totalDuration: 12000,
    },
  },
];
