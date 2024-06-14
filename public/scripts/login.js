document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.status === 'success') {
            sessionStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '/mypage.html';
        } else {
            document.getElementById('message').textContent = result.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'ログインに失敗しました';
    }
});
