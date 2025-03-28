# TasksManager

## Overview

**Task Manager** is a full-stack application designed for managing tasks. It includes a web client built with React and a backend server built with Firebase Cloud Functions. The app allows users to create, read, update, and delete tasks, making it a useful tool for task management.

---

## Requirements

### Backend (Firebase Functions)

- **Node.js**: v22 or higher
- **Firebase CLI**: v11.0.0 or higher
- **Google Cloud SDK** (for deploying functions)

### Frontend (Client)

- **Node.js**: v22 or higher
- **React**: v18 or higher
- **npm**: v7 or higher


---

## How to Run the Server

The backend is deployed on Firebase Cloud Functions, and you can run it locally for testing during development.

### Prerequisites

1. **Install Firebase CLI**:
    ```bash
    npm install -g firebase-tools
    ```

2. **Set up Firebase Project**:
    - Go to [Firebase Console](https://console.firebase.google.com/) and create a project if you haven’t already.
    - Initialize Firebase in your project directory by running:
    ```bash
    firebase init
    ```

3. **Install Dependencies**:
    - Navigate to the `functions` folder and install dependencies:
    ```bash
    cd functions
    npm install
    ```

4. **Set up Environment Variables**:
    - Create a `.env` file in the `functions` directory with your environment variables, like API keys, URLs, etc.
    
    Example:
    ```
    API_KEY=https://your-api-url
    ```

5. **Running the Functions Locally**:
    - Start the Firebase Functions emulator:
    ```bash
    firebase emulators:start --only functions
    ```

6. **Deploy the Functions to Firebase**:
    If you want to deploy the functions to Firebase, run:
    ```bash
    firebase deploy --only functions
    ```

---

## How to Run the Client (React)

### 1. **Clone the Repository**:
    - If you haven't cloned the repository, use:
    ```bash
    git clone https://github.com/dartm05/task-manager.git
    cd task-manager
    ```

### 2. **Install Dependencies**:
    Navigate to the `client` folder and install the necessary dependencies:
    ```bash
    cd client
    npm install
    ```

### 3. **Set up Environment Variables**:
    - Create a `.env` file in the `client` directory with your environment variables:
    
    Example:
    ```
    REACT_APP_API_URL=http://localhost:5001/task-manager-48639/us-central1/api
    ```

### 4. **Run the Client Locally**:
    - Start the React development server:
    ```bash
    npm start
    ```
    - Your client should now be running at [http://localhost:3000](http://localhost:3000).

### 5. **Building for Production**:
    If you want to build the client for production, run:
    ```bash
    npm run build
    ```

    The production-ready build will be in the `build` folder.

---

## Testing

### Backend (Server-side)
- Firebase Functions provide testing capabilities using the Firebase Emulator. You can test the API locally by interacting with it via the client or directly with Postman.

### Frontend (Client-side)
- You can test the React components by running the development server. All updates will be reflected in real-time.

To test components, you can also use tools like Jest and React Testing Library.

---

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
