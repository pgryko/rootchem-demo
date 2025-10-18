/**
 * API Client for RootChem Backend
 * Connects to local xtb calculations via Node.js backend
 */

const API_BASE_URL = 'http://localhost:5000/api';

export interface CalculationRequest {
  query: string;
}

export interface CalculationResponse {
  query: string;
  parsed: {
    molecule: string;
    calculationType: string;
    temperature: number;
  };
  molecule: string;
  results: {
    success: boolean;
    calculationType: string;
    totalEnergy?: number;
    totalEnergyUnit?: string;
    homoLumoGap?: number;
    homoLumoGapUnit?: string;
    gradientNorm?: number;
    dipoleMoment?: number;
    dipoleMomentUnit?: string;
    converged?: boolean;
  };
}

/**
 * Call the backend API to run real xtb calculation
 */
export async function runCalculation(query: string): Promise<CalculationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Calculation API error:', error);
    throw error;
  }
}

/**
 * Check if backend is healthy and xtb is available
 */
export async function checkHealth(): Promise<{
  status: string;
  xtbAvailable: boolean;
  claudeApiKey: boolean;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return {
      status: 'error',
      xtbAvailable: false,
      claudeApiKey: false,
    };
  }
}
