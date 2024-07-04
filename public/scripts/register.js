window.addEventListener('DOMContentLoaded', async() => {
    document.getElementById('loading').hidden = false
    document.getElementById('sendForm').hidden = true
    document.getElementById('verificate').hidden = true
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user){
        document.getElementById('loading').hidden = true
        document.getElementById('sendForm').hidden = false
        document.getElementById('verificate').hidden = true
    }else{
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
        if (result.status === "temp"){
            console.log("temp")
            document.getElementById('loading').hidden = true
            document.getElementById('sendForm').hidden = true
            document.getElementById('verificate').hidden = false
        }else if(result.status === "login"){
            console.log("login")
            window.location.href = '/mypage.html';
        }else if(result.status === "logout"){
            window.location.href = '/login.html';
        }else{
            console.log("else")
            document.getElementById('loading').hidden = true
            document.getElementById('sendForm').hidden = false
            document.getElementById('verificate').hidden = true
        }
    }
})

async function checkStatus(email){
    const status = await fetch('/checkStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    const result = await status.json();
    console.log(result)
    return result.status
}

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    sessionStorage.setItem('user', JSON.stringify(Object.fromEntries(formData)));

    try {
        const response = await fetch('/tempregister', {
            method: 'POST',
            body: formData // FormData そのまま送信
        });

        const result = await response.json();
        console.log('Server Response:', result);

        if (result.status === "success"){
            document.getElementById('sendForm').hidden = true;
            document.getElementById('verificate').hidden = false;
        }
        document.getElementById('message').textContent = result.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = '登録に失敗しました';
    }
  });

document.getElementById('varificateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const verificationCode = data.code
    const user = JSON.parse(sessionStorage.getItem('user'));
    const email = user.email
    console.log(verificationCode)
    console.log(email)
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email , verificationCode })
        });
        const result = await response.json();
        console.log(result)
        if (result.status === "success"){
            window.location.href = '/loading.html?redirect=/mypage.html';
        }
        
        document.getElementById('message2').textContent = result.message;
    } catch (error) {
        document.getElementById('message2').textContent = '認証に失敗しました';
    }
});

