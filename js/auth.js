document.addEventListener('DOMContentLoaded', function () {
    const currentUser = getCurrentUser();
    const page = window.location.pathname.split('/').pop();

    if (currentUser && (page === 'login.html' || page === 'index.html')) {
        window.location.href = 'home.html';
    }

    
    if (!currentUser && page === 'home.html') {
        window.location.href = 'index.html';
    }

    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        authForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (page === 'login.html') {
                handleLogin();
            } else {
                handleSignup();
            }
        });
    }
});

function handleLogin() {
    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const rememberMe = document.querySelector('#remember')?.checked;

    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = 'home.html', 1000);
    } else {
        showMessage('Invalid username or password', 'error');
    }
}

function handleSignup() {
    const email = document.querySelector('input[placeholder="Email"]').value;
    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;
    const termsAccepted = document.querySelector('#terms')?.checked;

    if (!email || !username || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (!termsAccepted) {
        showMessage('Please accept the terms and conditions', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.username === username)) {
        showMessage('Username already exists', 'error');
        return;
    }

    if (users.find(u => u.email === email)) {
        showMessage('Email already exists', 'error');
        return;
    }

    const newUser = {
        username,
        email,
        password,
        signupDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    showMessage('Account created successfully! Redirecting...', 'success');
    setTimeout(() => window.location.href = 'home.html', 1000);
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function showMessage(message, type) {
    const existing = document.querySelector('.auth-message');
    if (existing) existing.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;

    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    setTimeout(() => messageDiv.remove(), 4000);
}
