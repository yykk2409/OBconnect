import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';

const configPath = path.resolve('config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const API_URL = config.googleAppsScriptUrl;

export async function tempregisterUser(req, res) {
    const { email, password, name, role } = req.body;
    const verificationCode = Math.floor((Math.random() * 10000000000 + 10000000) % 1000000) // 6桁の検証コードを生成
    console.log('Verification Code:', verificationCode);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'tempregister',
                email,
                password,
                name,
                role,
                verificationCode
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Error:', result);
            res.status(200).json(result);
        } else {
            res.status(response.status).send('エラー: Google Apps Script のレスポンスに問題があります');
        }
    } catch (err) {
        console.error('サーバーエラー:', err);
        res.status(500).send('サーバーエラー');
    }
}
export async function registerUser(req, res) {
    const { email , verificationCode } = req.body;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'register',email, verificationCode })
        });
        console.log({ action: 'register',email, verificationCode })
        if (response.ok) {
            const result = await response.json();
            res.status(200).json(result); // 正しいJSONとしてレスポンスを返す
        } else {
            res.status(response.status).send('エラー: Google Apps Script のレスポンスに問題があります');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
}

export async function updateVerificationCode(req, res) {
    const { email , varificationCode } = req.body;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'updateVerificationCode',email, varificationCode })
        });

        if (response.ok) {
            const result = await response.json();
            res.status(200).json(result); // 正しいJSONとしてレスポンスを返す
        } else {
            res.status(response.status).send('エラー: Google Apps Script のレスポンスに問題があります');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
}
export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'login', email, password })
        });

        if (response.ok) {
            const result = await response.json();
            res.status(200).json(result);
        } else {
            res.status(response.status).send('エラー: Google Apps Script のレスポンスに問題があります');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
}

export async function logoutUser(req, res) {
    const { email } = req.body;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'logout', email })
        });
        if (response.ok) {
            const result = await response.json();
            res.status(200).json(result);
        } else {
            res.status(response.status).send('エラー: Google Apps Script のレスポンスに問題があります');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
}

export async function checkStatus(req, res) {
    const { email } = req.body;
    console.log(email)
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'checkStatus', email })
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result)
            res.status(200).json(result);
        } else {
            res.status(response.status).send('エラー: Google Apps Script のレスポンスに問題があります');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
}
