import express from 'express';
import { registerUser, loginUser, tempregisterUser, logoutUser, checkStatus } from './controllers/authController.js';
import { updateProfile } from './controllers/profileController.js';
import { findMatches } from './controllers/matchController.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

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