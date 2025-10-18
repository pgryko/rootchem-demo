/**
 * Configuration for RootChem Demo
 * Toggle between simulated and real xtb calculations
 */

export const config = {
  // Set to true to use real xtb calculations via backend API
  // Set to false to use simulated/staged results (faster for demos)
  USE_REAL_XTB: true,

  // Backend API URL
  API_URL: 'http://localhost:5000/api',

  // Simulation settings
  SIMULATED_DELAY_MS: 13000, // Total time for simulated run
};
