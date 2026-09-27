<div align="center">

# 🚀 DevHub
### AI-Powered GitHub Repository & Developer Explorer

Discover trending repositories, search developers, explore GitHub profiles, and manage your favorite repositories through a modern full-stack web application.

---

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8?style=for-the-badge&logo=tailwindcss)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge)

</div>

---

# 📖 Overview

DevHub is a modern GitHub Explorer that allows users to discover trending repositories, search repositories and developers, view detailed GitHub profiles, and save favorites after authentication.

The application is built using a **React + FastAPI** architecture and integrates directly with the GitHub REST API.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Dashboard

---

## 🔥 Trending Repositories

- View trending GitHub repositories
- Repository statistics
- Programming language
- Repository owner
- GitHub link

---

## 🔍 Repository Search

- Search any public repository
- Repository details
- Stars
- Forks
- Language
- Save repository to favorites

---

## 👨‍💻 Developer Search

- Search GitHub developers
- View developer profile
- Followers
- Following
- Public repositories
- Company
- Location
- Bio
- Save developer to favorites

---

## ⭐ Favorites

Authenticated users can save:

- Favorite Repositories
- Favorite Developers

Favorites are stored securely in the local database.

---

# 🏗 Architecture

```
                React + Vite
                      │
                Axios REST API
                      │
              FastAPI Backend
                      │
         GitHub REST API + SQLite
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- TailwindCSS
- Axios
- React Router
- Lucide Icons

---

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib
- Python Requests

---

## APIs

- GitHub REST API

---

# 📂 Project Structure

```
DevHub
│
├── backend
│   ├── app
│   │   ├── auth
│   │   ├── config
│   │   ├── database
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/jaswanthv2207-sys/DevHub.git
```

```
cd DevHub
```

---

# Backend Setup

```
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn app.main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

---

# Frontend Setup

```
cd frontend
```

Install packages

```bash
npm install
```

Run project

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🔑 Environment

Backend configuration:

```
SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 🌐 API Endpoints

## Authentication

```
POST /auth/register

POST /auth/login
```

---

## GitHub

```
GET /github/trending

GET /github/repositories

GET /github/repositories/{owner}/{repo}

GET /github/developers

GET /github/developers/{username}
```

---

## Favorites

```
GET /favorites/repositories

POST /favorites/repositories

DELETE /favorites/repositories/{id}

GET /favorites/developers

POST /favorites/developers

DELETE /favorites/developers/{id}
```

---

# 🎯 Future Improvements

- Repository analytics
- Commit history visualization
- Dark/Light mode
- GitHub OAuth Login
- AI Repository Recommendations
- AI Developer Recommendation Engine
- Repository comparison
- Charts & Insights
- Organization support
- Notifications

---

# 📹 Demo

Demo Video

(Add YouTube or Drive Link)

---

# 🌍 Live Demo

Frontend

https://frontend-pi-blue-11.vercel.app/

Backend

https://devhub-backend-egbw.onrender.com

---

# 👨‍💻 Developer

**Jaswanth V**

Computer Science & Engineering (AI & ML)

SRM Institute of Science and Technology

GitHub

https://github.com/jaswanthv2207-sys

LinkedIn

https://www.linkedin.com/in/jaswanth-v-718495329/

---

# 📜 License

This project is developed for educational and hackathon purposes.

MIT License.

---

<div align="center">

### ⭐ If you like this project, consider giving it a star on GitHub!

Built with ❤️ using React, FastAPI and GitHub API

</div>
