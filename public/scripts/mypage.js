window.addEventListener('DOMContentLoaded', async() => {
    document.getElementById('loading').hidden = false
    document.getElementById('main').hidden = true
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
        document.getElementById('loading').hidden = true
        document.getElementById('main').hidden = false
    }else if(result.status === "logout"){
        window.location.href = '/login.html';
    }else{
        window.location.href = '/register.html';
    }
})

window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const status = sessionStorage.getItem('status');
    if (status !== 'login') {
        window.location.href = '/login.html';
        return;
    }

    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    document.getElementById('role').textContent = user.role;

    document.getElementById('logoutButton').addEventListener('click', () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email })
        })
        window.location.href = '/login.html';
    });
});
