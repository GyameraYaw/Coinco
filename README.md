# Comico – Crypto Progress Web App

**Comico** is a sleek, glassmorphism-inspired front-end web application designed to simulate a modern crypto-themed user experience. It includes user authentication, interactive UI elements, and a crypto dashboard concept. The project is entirely front-end and uses **localStorage** to handle user accounts and sessions.

---

## 🚀 Features

- 🔐 **User Authentication (Login & Signup)**
  - Stores user credentials using `localStorage`
  - Form validation with feedback
  - Remember Me functionality

- 📊 **Crypto Dashboard**
  - Interactive visual elements (charts, cards, pricing blocks)
  - Responsive layout with team section, profile bubbles, and more

- 🎨 **Modern UI Design**
  - Implements **glassmorphism** with blur effects and transparency
  - Fully responsive and animated components
  - Custom design elements: navigation, welcome modal, chart bars, NFT badge, etc.

---

## 🧠 How It Works

The app does not use a backend. Instead, it relies on **`localStorage`** to persist user data:

### ✅ Signup
- On signup, user info (`email`, `username`, `password`, `signupDate`) is saved to `localStorage` in a `users` array.
- The current user session is saved in a separate `currentUser` object.

### ✅ Login
- Checks user credentials against `localStorage`.
- If matched, sets a new `currentUser` object.

### ✅ Logout
- Removes `currentUser` from localStorage and redirects to login.

---

## 🛠 How to Run the Project Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/GyameraYaw/Comico.git
   cd Comico
