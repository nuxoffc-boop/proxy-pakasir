import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { project, order_id, amount } = req.body;
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API_KEY not set in environment variables' });
  }

  try {
    const response = await fetch('https://app.pakasir.com/api/transactioncreate/qris', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project, order_id, amount, api_key: API_KEY })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}