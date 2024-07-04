import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import multer from 'multer'
import { randomBytes } from 'crypto';

const configPath = path.resolve('config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const API_URL = config.googleAppsScriptUrl;

export async function tempregisterUser(req, res){
    const { email, password, name, role } = req.body;
    const verificationCode = Math.floor((Math.random() * 10000000000 + 10000000) % 1000000); // 6桁の検証コードを生成
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const base64File = req.file.buffer.toString('base64');
    const fileName = encodeURIComponent(req.file.originalname);
    const formData = {
      base64File: base64File,
      fileName: fileName,
      mimeType: req.file.mimetype
    };
  
    try {
      // PDF を Google Apps Script に送信
      const fileResponse = await fetch('https://script.google.com/macros/s/AKfycbwtHfD5Z_EZC_le2jyCulRoBPKM1Bi34HHRg-6tdx57pN1sX6F9uGLIbTf9wz5RwZ4L/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const fileData = await fileResponse.json();
      if (!fileResponse.ok) {
        return res.status(fileResponse.status).json({ error: 'Failed to upload PDF' });
      }
  
      // ユーザーを一時登録
      const tempResponse = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'tempregister',
          email,
          password,
          name,
          role,
          verificationCode
        })
      });
      if (!tempResponse.ok) {
        return res.status(tempResponse.status).json({ error: 'Failed to register user' });
      }
      const result = await tempResponse.json();
      console.log('Verification Code:', verificationCode);
      res.status(200).json({ ...result });
    } catch (err) {
      console.error('サーバーエラー:', err);
      res.status(500).send('サーバーエラー');
    }
};

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
