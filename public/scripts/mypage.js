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
        localStorage.setItem('status', 'logout');
        sessionStorage.removeItem('user');
        window.location.href = '/login.html';
    });
});
