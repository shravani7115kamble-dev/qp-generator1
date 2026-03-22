'use strict';

const express = require('express');
const https = require('https');
const router = express.Router();

// GET /api/joke/random -> fetch a random joke from external API and return it
router.get('/random', (req, res) => {
  const url = 'https://official-joke-api.appspot.com/jokes/random';

  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
      try {
        const joke = JSON.parse(data);
        res.json({ success: true, source: 'official-joke-api', joke });
      } catch (err) {
        res.status(502).json({ success: false, error: 'Invalid response from joke provider' });
      }
    });
  }).on('error', (err) => {
    res.status(502).json({ success: false, error: 'Failed to fetch joke', details: err.message });
  });
});

// GET /api/joke/dad -> fetch a dad joke from icanhazdadjoke.com
router.get('/dad', (req, res) => {
  const options = {
    hostname: 'icanhazdadjoke.com',
    path: '/',
    headers: { 'Accept': 'application/json', 'User-Agent': 'qp-generator/1.0' }
  };

  https.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
      try {
        const joke = JSON.parse(data);
        res.json({ success: true, source: 'icanhazdadjoke', joke });
      } catch (err) {
        res.status(502).json({ success: false, error: 'Invalid response from dad-joke provider' });
      }
    });
  }).on('error', (err) => {
    res.status(502).json({ success: false, error: 'Failed to fetch dad joke', details: err.message });
  });
});

module.exports = router;
