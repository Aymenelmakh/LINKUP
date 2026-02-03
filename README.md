
# LinkUp 🚀
LinkUp is a **front-end social media web application** that allows users to authenticate, view profiles, create and manage posts, and interact through comments. It consumes a **RESTful API** and supports user-specific actions like updating and deleting posts. The app features loaders for async requests and **dark mode** for a better user experience.
---

## 🌟 Features

- User authentication (register/login/logout)
- Profile management
- Create, update, delete, and view posts
- Comment on posts
- Async request loaders for smooth UX
- Dark mode toggle
- Responsive design with **Bootstrap**

---

## 🛠 Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **CSS Framework:** Bootstrap  
- **HTTP Requests:** Axios  

---

## 📁 Project Structure
```
LINKUP/
│
├─ packages/
│ ├─ node_modules/
│ ├─ package.json
│ └─ package-lock.json
│
├─ scripts/
│ ├─ Alert.js
│ ├─ comments.js
│ ├─ createTgas.js
│ ├─ getpost.js
│ ├─ loader.js
│ ├─ logout.js
│ ├─ main.js
│ ├─ mainLogic.js
│ ├─ open_profile.js
│ ├─ post.js
│ ├─ profile.js
│ ├─ reload.js
│ ├─ renderPost.js
│ ├─ scroll.js
│ └─ theme.js
│
├─ style/
│ ├─ profile_style.css
│ └─ style.css
│
├─ templates/
│ ├─ home.html
│ ├─ post.html
│ └─ profile.html
│
├─ .gitignore
└─ README.md
```
## ⚡ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/LinkUp.git
cd LinkUp
```
2. **Install dependencies**
```bash
npm install
```
  This installs Axios and any other dependencies listed in package.json

## 🚀 Quick Start

1. **Serve the project**
Use VS Code Live Server or any static server to open templates/home.html in your browser.
