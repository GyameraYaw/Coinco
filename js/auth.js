document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('index.html'))) {
        window.location.href = 'home.html';
    }
    
    
    initializeAuthForms();
});

function initializeAuthForms() {
    const authForm = document.querySelector('.auth-form');
    if (!authForm) return;
    
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isLoginPage = window.location.pathname.includes('login.html');
        
        if (isLoginPage) {
            handleLogin();
        } else {
            handleSignup();
        }
    });
}

function handleLogin() {
    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const rememberMe = document.querySelector('#remember').checked;
    
    
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        
        const loginData = {
            username: user.username,
            email: user.email,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        localStorage.setItem('currentUser', JSON.stringify(loginData));
        
        showMessage('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
    } else {
        showMessage('Invalid username or password', 'error');
    }
}

function handleSignup() {
    const email = document.querySelector('input[placeholder="Email"]').value;
    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;
    const termsAccepted = document.querySelector('#terms').checked;
    
    
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
        id: Date.now().toString(),
        username,
        email,
        password,
        signupDate: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    
    const loginData = {
        username: newUser.username,
        email: newUser.email,
        loginTime: new Date().toISOString(),
        rememberMe: false
    };
    
    localStorage.setItem('currentUser', JSON.stringify(loginData));
    
    showMessage('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
}

function showMessage(message, type) {
   
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    
    const authForm = document.querySelector('.auth-form');
    authForm.parentNode.insertBefore(messageDiv, authForm.nextSibling);
    
   
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}


function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}


function isAuthenticated() {
    return getCurrentUser() !== null;
}

ddocument.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');

    const isAllowedPage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname.endsWith('login.html');

    if (!currentUser && !isAllowedPage) {
        window.location.href = 'index.html'; 
    }
});

