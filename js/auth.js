// auth.js - Authentication functionality

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    // If user is logged in and on auth pages, redirect to homepage
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
        window.location.href = 'index.html';
    }
    
    // Initialize auth forms
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
    
    // Basic validation
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Login successful
        const loginData = {
            username: user.username,
            email: user.email,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        localStorage.setItem('currentUser', JSON.stringify(loginData));
        
        showMessage('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
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
    
    // Validation
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
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username)) {
        showMessage('Username already exists', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showMessage('Email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        signupDate: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after signup
    const loginData = {
        username: newUser.username,
        email: newUser.email,
        loginTime: new Date().toISOString(),
        rememberMe: false
    };
    
    localStorage.setItem('currentUser', JSON.stringify(loginData));
    
    showMessage('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message after the form
    const authForm = document.querySelector('.auth-form');
    authForm.parentNode.insertBefore(messageDiv, authForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Logout function for homepage
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return getCurrentUser() !== null;
}