document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        try {
            const result = JSON.parse(text);
            if (response.ok) {
                alert(result.message);
            } else {
                alert('登録に失敗しました: ' + result.message);
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', text);
            alert('サーバーからの無効なレスポンス');
        }
    } catch (err) {
        console.error(err);
        alert('サーバーエラーが発生しました');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        try {
            const result = JSON.parse(text);
            if (response.ok) {
                alert('ログイン成功: ' + JSON.stringify(result));
            } else {
                alert('ログインに失敗しました: ' + result.message);
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', text);
            alert('サーバーからの無効なレスポンス');
        }
    } catch (err) {
        console.error(err);
        alert('サーバーエラーが発生しました');
    }
});
