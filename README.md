# Quiz Application

This is a feature-rich quiz application built with the MERN stack (MongoDB, Express, React, Node.js). The application presents a user with 15 questions fetched from a public API, complete with a 30-minute timer and a final, detailed report page.

## Features

* **User Onboarding:** A simple start page to collect a user's email address.
* **Dynamic Quiz:** Fetches 15 unique questions from the Open Trivia Database API for each new session.
* **Countdown Timer:** A 30-minute timer is prominently displayed, and the quiz automatically submits when the time is up.
* **Interactive Navigation Panel:** A side panel allows users to jump to any question. It also visually indicates which questions are **visited**, **attempted**, or **currently active**.
* **Comprehensive Report:** After submission, a report page displays each question alongside the user's answer and the correct answer for easy comparison.
* **API Caching:** To avoid API rate-limiting issues, questions are cached in the browser's session storage.

## Tech Stack

* **Frontend:** React (bootstrapped with Vite), Axios, React Router DOM
* **Backend:** Node.js, Express, Mongoose
* **Database:** MongoDB (with MongoDB Atlas)
* **Styling:** Plain CSS

## Project Status & Future Plans

The frontend of this application is fully functional and meets all core requirements. The Node.js/Express backend server is also initialized and set up to connect to a MongoDB database.

**Future Development:** The next step for this project is to connect the frontend to the backend. This will enable the application to save each user's quiz results (email and score) to the database, allowing for features like leaderboards or performance tracking over time.

## Setup and Installation

To run this project locally, you will need to run both the frontend and backend servers.

### **Backend Setup**

1.  **Navigate to the backend directory:**
    ```bash
    cd quiz-app/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add your MongoDB Atlas connection string:
    ```
    PORT=5001
    MONGO_URI=<your_mongodb_connection_string>
    ```

4.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5001`.

### **Frontend Setup**

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd quiz-app/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Challenges Faced & Solutions

A significant challenge was handling the `429 (Too Many Requests)` error from the Open Trivia Database API. This error occurred frequently during development due to hot-reloading.

**Solution:** I implemented a caching strategy using `sessionStorage`. The application now fetches questions from the API only once per session, retrieving them from the cache on subsequent reloads. This resolved the rate-limiting issue and improved performance.