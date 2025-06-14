// Simple in-memory store for visitor count
// Note: This will reset whenever the serverless function is redeployed
// For persistence, you should use a database like MongoDB, FaunaDB, etc.
let visitorCount = 0;

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // For POST requests, increment the counter (new visitor)
  if (req.method === 'POST') {
    visitorCount++;
    return res.status(200).json({ count: visitorCount });
  }
  
  // For GET requests, just return the current count
  if (req.method === 'GET') {
    return res.status(200).json({ count: visitorCount });
  }
  
  // Handle other HTTP methods
  return res.status(405).json({ error: 'Method not allowed' });
} 