# Space Explorer Dashboard Project Report

## 1. Introduction

Space Explorer Dashboard is a full-stack web application developed to provide users with access to space exploration data using NASA's Open APIs. The application allows users to view NASA's Astronomy Picture of the Day (APOD), explore Mars Rover photographs, and save their favorite discoveries for future reference.

The project demonstrates integration of external APIs, database management, frontend development, and backend development using modern web technologies.

---

# 2. Objectives

The primary objectives of the project are:

* Integrate NASA Open APIs.
* Display Astronomy Picture of the Day.
* Display Mars Rover photographs.
* Store favorite space discoveries in a database.
* Develop a responsive dashboard interface.
* Demonstrate full-stack development skills.

---

# 3. Technologies Used

## Frontend

* React.js
* Vite
* Axios
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas

## External APIs

* NASA APOD API
* NASA Mars Rover Photos API

## Version Control

* Git
* GitHub

---

# 4. System Architecture

User → React Frontend → Express Backend → NASA APIs

User → React Frontend → Express Backend → MongoDB Atlas

The frontend sends requests to the backend. The backend communicates with NASA APIs and MongoDB, processes data, and returns responses to the frontend.

---

# 5. Features

## Astronomy Picture of the Day

* Fetches NASA APOD data.
* Displays image, title, and explanation.
* Updates automatically based on NASA API data.

## Mars Rover Explorer

* Allows rover selection.
* Allows Earth date selection.
* Displays rover images.
* Displays rover metadata.

## Favorites Management

* Save favorite discoveries.
* Retrieve stored favorites.
* Store data in MongoDB Atlas.

---

# 6. API Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | /api/apod          | Get APOD data         |
| GET    | /api/mars          | Get Mars Rover photos |
| GET    | /api/mars/rovers   | Get rover metadata    |
| POST   | /api/favorites     | Save favorite         |
| GET    | /api/favorites     | Retrieve favorites    |
| PUT    | /api/favorites/:id | Update favorite       |
| DELETE | /api/favorites/:id | Delete favorite       |

---

# 7. Challenges Faced

## NASA API Integration

Understanding API parameters and handling different response formats.

## MongoDB Connectivity

Establishing and debugging database connections.

## Mars Rover Date Validation

Ensuring selected dates matched rover operational periods.

## Frontend-Backend Communication

Managing API requests and handling errors effectively.

---

# 8. Testing

The application was tested for:

* APOD API functionality
* Mars Rover API functionality
* MongoDB connectivity
* Favorites functionality
* Error handling
* UI responsiveness

All tests passed successfully.

---

# 9. Future Scope

* User Authentication
* Search Functionality
* Advanced Filtering
* Space News Integration
* Near-Earth Object Tracking
* International Space Station Tracking
* Deployment on Cloud Platforms

---

# 10. Conclusion

The Space Explorer Dashboard successfully integrates NASA APIs with a modern full-stack architecture. The project demonstrates practical skills in frontend development, backend development, database management, REST API integration, and version control. The application provides an interactive platform for exploring space-related information while maintaining scalability for future enhancements.

---

# Developed By

Ayush Kumar

2562015

B.Tech CSE (AI & ML)

CHRIST (Deemed to be University), Bangalore
