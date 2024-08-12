# Project Name

## Overview

This project consists of a backend and a frontend application. The backend is built with Node.js and runs on port `5000`, while the frontend is built with React and runs on port `3000`. The applications communicate with each other to provide a seamless experience.

## Backend

### Prerequisites

- Node.js (>=14.x)
- MySQL (or your preferred database)

### Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd <repository-folder>/backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

   Create a `.env` file in the `backend` folder with the following variables:

    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=<your-database-username>
    DB_PASSWORD=<your-database-password>
    DB_NAME=<your-database-name>
    ```

4. **Run the backend server**

    ```bash
    npm start
    ```

   The backend server should now be running on `http://localhost:5000`.

## Frontend

### Prerequisites

- Node.js (>=14.x)
- npm (comes with Node.js)

### Setup

1. **Navigate to the frontend folder**

    ```bash
    cd <repository-folder>/frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the frontend server**

    ```bash
    npm start
    ```

   The frontend server should now be running on `http://localhost:3000`.

## API Endpoints

### Backend Endpoints

- **POST /register**: Register a new user.
- **GET /questions**: Fetch all questions.
- **POST /questions**: Add a new question.
- **PUT /questions/:id**: Update a question by ID.
- **DELETE /questions/:id**: Delete a question by ID.

## CORS Configuration

To allow your frontend to communicate with the backend, ensure that CORS is properly configured on the backend. You can use the `cors` middleware in your Express.js setup:

```js
const cors = require('cors');
app.use(cors());
