import express from 'express';
import { registerUser, loginUser, tempregisterUser, logoutUser, checkStatus } from './controllers/authController.js';
import { updateProfile } from './controllers/profileController.js';
import { findMatches } from './controllers/matchController.js';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.json({ extended: true, limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.post('/proxy', async (req, res) => {
  console.log('Received request size:', JSON.stringify(req.body).length);
  try {
    const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// エラーハンドリング
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    res.status(413).json({ error: 'Payload too large' });
  } else {
    res.status(500).json({ error: err.message });
  }
});
app.post('/tempregister', tempregisterUser);
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.post('/checkStatus', checkStatus);
app.post('/updateProfile', updateProfile);
app.post('/search', findMatches);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});