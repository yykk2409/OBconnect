window.addEventListener('DOMContentLoaded', async() => {
    document.getElementById('loading').hidden = false
    document.getElementById('sendForm').hidden = true
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user){
        window.location.href = '/register.html';
    }
    const email = user.email
    const status = await fetch('/checkStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    const result = await status.json();
    console.log(result)
    if(result.status === "login"){
        window.location.href = '/mypage.html';
    }else if(result.status === "logout"){
        document.getElementById('loading').hidden = true
        document.getElementById('sendForm').hidden = false
    }else{
        window.location.href = '/register.html';
    }
})

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
