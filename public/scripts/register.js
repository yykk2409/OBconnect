/*window.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const email = user.email
    const status = sessionStorage.getItem('status');
    console.log(status)

    if (status === "temp"){
        document.getElementById('sendForm').hidden = true
        document.getElementById('verificate').hidden = false
    }else if(status === "login"){
        window.location.href = '/mypage.html';
    }else{
        document.getElementById('sendForm').hidden = false
        document.getElementById('verificate').hidden = true
    }
});*/
window.addEventListener('DOMContentLoaded', async() => {
    document.getElementById('loading').hidden = false
    document.getElementById('sendForm').hidden = true
    document.getElementById('verificate').hidden = true
    const user = JSON.parse(sessionStorage.getItem('user'));
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
    }else{
        console.log("else")
        document.getElementById('loading').hidden = true
        document.getElementById('sendForm').hidden = false
        document.getElementById('verificate').hidden = true
    }
    sessionStorage.setItem('status', result);
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

/*window.onload = async function(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user) {
        window.location.href = '/register_student.html';
    }
    const email = user.email
    const status = await fetch('/checkStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    const status = await status.json();
    console.log(result)
    if (status === "temp"){
        document.getElementById('sendForm').hidden = true
        document.getElementById('verificate').hidden = false
    }else if(status === "login"){
        window.location.href = '/mypage.html';
    }else{
        document.getElementById('sendForm').hidden = false
        document.getElementById('verificate').hidden = true
    }
    sessionStorage.setItem('status', result);
}*/
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    sessionStorage.setItem('user', JSON.stringify(data));

    try {
        const response = await fetch('/tempregister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json(); // 一度だけ response.json() を呼び出す
        console.log('Server Response:', result);
        if (result.status === "success"){
            document.getElementById('sendForm').hidden = true
            document.getElementById('verificate').hidden = false
        }
        document.getElementById('message').textContent = result.message; // 修正: 'massage' を 'message' に変更
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

