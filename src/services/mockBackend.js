// This file simulates a backend server for development purposes
// Run with: node src/services/mockBackend.js

import { createServer } from 'http';
import { parse } from 'url';

// Sample food database (simplified)
const foodDatabase = [
  {
    food_name: 'Rice, raw, milled (Oryza sativa)',
    energy_kj: '348',
    energy_kcal: '83',
    carb_g: '19.0',
    protein_g: '1.5',
    fat_g: '0.2',
    freesugar_g: '0.0',
    fibre_g: '0.4'
  },
  {
    food_name: 'Chicken, broiler, curry cut, flesh, raw (Gallus gallus domesticus)',
    energy_kj: '502',
    energy_kcal: '120',
    carb_g: '0.0',
    protein_g: '14.0',
    fat_g: '7.0',
    freesugar_g: '0.0',
    fibre_g: '0.0'
  },
  // More food items would be here in a real implementation
];

// Set up a simple HTTP server
const server = createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Parse URL to get the pathname
  const { pathname } = parse(req.url, true);
  
  // Handle API routes
  if (pathname === '/analyze-dish' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { dish } = JSON.parse(body);
        
        // In a real implementation, this would call your Python backend
        // For now, return a simple mock response
        const mockResponse = {
          dish: dish,
          ingredients_extracted: ['Rice', 'Chicken', 'Onion'],
          logs: ['Extracted ingredients', 'Matched nutrition data'],
          category: 'Main Dish',
          serving_weight_g: 150,
          nutrition_per_serving: {
            energy_kj: 800,
            energy_kcal: 190,
            carb_g: 25,
            protein_g: 12,
            fat_g: 6,
            freesugar_g: 1,
            fibre_g: 2
          }
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockResponse));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request data' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Mock backend server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /analyze-dish - Analyze a single dish');
});