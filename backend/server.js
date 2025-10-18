const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = 5000;

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());

// Molecule library
const MOLECULES = {
  aspirin: 'aspirin.xyz',
  benzene: 'benzene.xyz',
  water: 'water.xyz',
  'methyl iodide': 'methyl_iodide.xyz',
  'methyl-iodide': 'methyl_iodide.xyz',
  anthracene: 'anthracene.xyz',
  'solar cell': 'anthracene.xyz', // map to organic semiconductor
  'organic solar cell': 'anthracene.xyz',
};

/**
 * Use Claude to parse natural language query into structured calculation request
 */
async function parseQueryWithClaude(userQuery) {
  const prompt = `You are a quantum chemistry assistant. Parse this user query and extract:
1. The molecule name (e.g., "aspirin", "benzene", "water", "anthracene")
2. The calculation type (options: "energy", "optimization", "homo-lumo", "properties")
3. Any specific parameters

User query: "${userQuery}"

Respond ONLY with a JSON object in this exact format:
{
  "molecule": "molecule_name",
  "calculationType": "energy|optimization|homo-lumo|properties",
  "temperature": 298
}

Examples:
- "Calculate the binding energy of aspirin" → {"molecule": "aspirin", "calculationType": "energy", "temperature": 298}
- "Optimize benzene" → {"molecule": "benzene", "calculationType": "optimization", "temperature": 298}
- "HOMO-LUMO gap for anthracene" → {"molecule": "anthracene", "calculationType": "homo-lumo", "temperature": 298}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].text.trim();
    // Extract JSON from response (might have markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse Claude response');
  } catch (error) {
    console.error('Claude parsing error:', error);
    // Fallback to simple keyword matching
    return fallbackParsing(userQuery);
  }
}

/**
 * Fallback parser if Claude API fails
 */
function fallbackParsing(query) {
  const lowerQuery = query.toLowerCase();

  // Find molecule
  let molecule = 'benzene'; // default
  for (const [key, file] of Object.entries(MOLECULES)) {
    if (lowerQuery.includes(key)) {
      molecule = key;
      break;
    }
  }

  // Find calculation type
  let calculationType = 'energy'; // default
  if (lowerQuery.includes('optim')) calculationType = 'optimization';
  else if (lowerQuery.includes('homo') || lowerQuery.includes('lumo') || lowerQuery.includes('gap')) {
    calculationType = 'homo-lumo';
  }

  return { molecule, calculationType, temperature: 298 };
}

/**
 * Execute xtb calculation
 */
function runXTB(moleculeFile, calculationType) {
  return new Promise((resolve, reject) => {
    const moleculePath = path.join(__dirname, 'molecules', moleculeFile);

    if (!fs.existsSync(moleculePath)) {
      return reject(new Error(`Molecule file not found: ${moleculeFile}`));
    }

    // Determine xtb flags based on calculation type
    let xtbFlags = '--gfn 2 --sp'; // default: single point
    if (calculationType === 'optimization') {
      xtbFlags = '--gfn 2 --opt';
    } else if (calculationType === 'homo-lumo' || calculationType === 'properties') {
      xtbFlags = '--gfn 2 --sp'; // single point gives HOMO-LUMO
    }

    const command = `cd ${__dirname}/molecules && xtb ${moleculeFile} ${xtbFlags}`;

    console.log(`Executing: ${command}`);

    exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error && !stdout.includes('normal termination')) {
        console.error('xtb error:', error);
        return reject(error);
      }

      // Parse xtb output
      const results = parseXTBOutput(stdout, calculationType);
      resolve(results);
    });
  });
}

/**
 * Parse xtb output and extract relevant data
 */
function parseXTBOutput(output, calculationType) {
  const results = {
    success: true,
    calculationType,
    rawOutput: output
  };

  // Extract total energy
  const energyMatch = output.match(/total energy\s+([-\d.]+)\s+Eh/);
  if (energyMatch) {
    results.totalEnergy = parseFloat(energyMatch[1]);
    results.totalEnergyUnit = 'Eh';
  }

  // Extract HOMO-LUMO gap
  const gapMatch = output.match(/HOMO-LUMO GAP\s+([-\d.]+)\s+eV/);
  if (gapMatch) {
    results.homoLumoGap = parseFloat(gapMatch[1]);
    results.homoLumoGapUnit = 'eV';
  }

  // Extract gradient norm (for optimization)
  const gradMatch = output.match(/gradient norm\s+([-\d.]+)\s+Eh\/a0/);
  if (gradMatch) {
    results.gradientNorm = parseFloat(gradMatch[1]);
  }

  // Extract dipole moment
  const dipoleMatch = output.match(/molecular dipole.*?total.*?([-\d.]+)\s+Debye/s);
  if (dipoleMatch) {
    results.dipoleMoment = parseFloat(dipoleMatch[1]);
    results.dipoleMomentUnit = 'Debye';
  }

  // Check if optimization converged
  if (calculationType === 'optimization') {
    results.converged = output.includes('GEOMETRY OPTIMIZATION CONVERGED') ||
                        output.includes('*** GEOMETRY OPTIMIZATION CONVERGED ***');
  }

  return results;
}

/**
 * Main API endpoint
 */
app.post('/api/calculate', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'No query provided' });
    }

    console.log(`\n=== New calculation request ===`);
    console.log(`Query: ${query}`);

    // Step 1: Parse query with Claude
    const parsedQuery = await parseQueryWithClaude(query);
    console.log('Parsed:', parsedQuery);

    // Step 2: Map to molecule file
    const moleculeKey = parsedQuery.molecule.toLowerCase();
    const moleculeFile = MOLECULES[moleculeKey] || MOLECULES['benzene'];

    console.log(`Molecule: ${moleculeKey} → ${moleculeFile}`);

    // Step 3: Run xtb calculation
    const results = await runXTB(moleculeFile, parsedQuery.calculationType);

    console.log('Results:', results);

    // Step 4: Return results
    res.json({
      query,
      parsed: parsedQuery,
      molecule: moleculeKey,
      results
    });

  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({
      error: error.message,
      details: error.stack
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  exec('which xtb', (error, stdout) => {
    res.json({
      status: 'ok',
      xtbPath: stdout.trim(),
      xtbAvailable: !error,
      claudeApiKey: !!process.env.ANTHROPIC_API_KEY
    });
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 RootChem Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 API endpoint: http://localhost:${PORT}/api/calculate\n`);
});
