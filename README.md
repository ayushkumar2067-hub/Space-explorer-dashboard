# 🚀 Space Explorer Dashboard

A full-stack web application that allows users to explore space-related data provided by NASA APIs. The project integrates NASA's Astronomy Picture of the Day (APOD) and Mars Rover Photos APIs, while also enabling users to save their favorite discoveries using MongoDB.

---

## 📌 Project Overview

Space Explorer Dashboard is designed to provide an interactive platform for viewing and managing space exploration content. Users can browse NASA's daily astronomy images, explore photos captured by Mars rovers, and maintain a personalized collection of favorite space discoveries.

The application follows a modern full-stack architecture using React for the frontend, Express.js and Node.js for the backend, and MongoDB for data storage.

---

## ✨ Features

### 🌌 Astronomy Picture of the Day (APOD)

* Fetches daily astronomy images directly from NASA API.
* Displays image title, date, and detailed explanation.
* Supports high-resolution image viewing.

### 🔴 Mars Rover Photos

* Retrieves images captured by NASA Mars rovers.
* Supports filtering by rover and Earth date.
* Displays rover information and captured photographs.

### ⭐ Favorites Management

* Save favorite APOD entries and Mars Rover photos.
* Store favorite records in MongoDB.
* Retrieve saved favorites through REST APIs.

### 📊 Dashboard Interface

* Modern React-based user interface.
* Responsive design for desktop and mobile devices.
* Dynamic data fetching using Axios.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* REST API Architecture

### Database

* MongoDB Atlas
* MongoDB Driver / Mongoose

### External APIs

* NASA APOD API
* NASA Mars Rover Photos API

---

## 📂 Project Structure

```text
SpaceExplorerDashboard
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── middlewares
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docs
├── qa
├── postman
└── README.md
```

---

## 🔧 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/space-explorer-dashboard.git
cd space-explorer-dashboard
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env` file:

```env
PORT=5000

NASA_API_KEY=YOUR_NASA_API_KEY

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start backend:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔗 API Endpoints

### APOD

```http
GET /api/apod
```

Returns NASA Astronomy Picture of the Day.

---

### Mars Rover Photos

```http
GET /api/mars
```

Returns Mars Rover images.

Optional Query Parameters:

```http
/api/mars?rover=curiosity&earth_date=2020-07-01
```

---

### Favorites

Create Favorite:

```http
POST /api/favorites
```

Get Favorites:

```http
GET /api/favorites
```

---

## 📸 Sample Output

### APOD

```json
{
  "title": "Milky Way Urban Style",
  "date": "2026-06-26",
  "url": "image_url",
  "explanation": "NASA Astronomy Picture of the Day"
}
```

---

## 🚀 Future Enhancements

* User Authentication
* Search Functionality
* Infinite Photo Gallery
* Dark/Light Theme Toggle
* Space News Integration
* NASA NeoWs (Near Earth Objects)
* ISS Tracking System
* Deployment on Render/Vercel

---

## 👨‍💻 Author

**Ayush Kumar**

2562015

B.Tech CSE (AI & ML)

CHRIST (Deemed to be University), Bangalore

---

## 📜 License

This project is developed for academic and educational purposes.
