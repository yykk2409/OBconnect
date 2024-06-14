import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve('config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const API_URL = config.googleAppsScriptUrl;

export async function updateProfile(req, res) {
    const { email, name, bio, interests } = req.body;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'updateProfile', email, name, bio, interests })
        });

        const text = await response.text();

        try {
            const result = JSON.parse(text);
            if (response.ok) {
                res.status(200).send(result.message);
            } else {
                res.status(response.status).send(result.message);
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', text);
            res.status(500).send('Invalid JSON response from API');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
}
