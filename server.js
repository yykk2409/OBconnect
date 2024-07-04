import express from 'express';
import { registerUser, loginUser, tempregisterUser, logoutUser, checkStatus } from './controllers/authController.js';
import { updateProfile } from './controllers/profileController.js';
import { findMatches } from './controllers/matchController.js';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer'
const upload = multer();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// エラーハンドリング
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    res.status(413).json({ error: 'Payload too large' });
  } else {
    res.status(500).json({ error: err.message });
  }
});
app.post('/tempregister', upload.single('file'), tempregisterUser);
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.post('/checkStatus', checkStatus);
app.post('/updateProfile', updateProfile);
app.post('/search', findMatches);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});