🧳 Job Tracker Application
A comprehensive web application designed to help users efficiently track their job applications. Built with React for a dynamic user interface, Material-UI for a modern and responsive design, and Firebase for robust backend services including authentication and real-time data storage.

This project demonstrates a full CRUD (Create, Read, Update, Delete) implementation, theme management, and secure handling of API keys.

✨ Features
User Authentication: Secure user registration and login powered by Firebase Authentication.

Job Application Management:

Create: Add new job applications with details like title, company, status, deadline, and notes.

Read: View a list of all your tracked job applications.

Update: Edit existing job application details (e.g., change status from "Applied" to "Interviewing").

Delete: Remove job applications from your list.

Persistent Data Storage: All job data is securely stored in Firebase Firestore, ensuring data persists across sessions.

Real-time Updates: Changes made to job applications are reflected instantly in the UI.

Theme Toggling: Seamlessly switch between light and dark modes for a personalized user experience.

Loading Indicators: Visual feedback (spinners) during asynchronous operations (e.g., data fetching, form submissions).

Secure API Key Handling: Firebase configuration is managed via environment variables (.env) to prevent public exposure of sensitive keys on GitHub.

🚀 Live Demo
Experience the Job Tracker application live here:
https://job-tracker-app-umber.vercel.app/

🛠️ Technologies Used
Frontend:

React (Vite for fast development)

Material-UI (MUI) for UI components and styling

Backend & Database:

Firebase Authentication

Firebase Firestore (NoSQL cloud database)

Version Control: Git & GitHub

Deployment: Vercel

⚙️ Setup and Installation (for Local Development)
Follow these steps to get a local copy of the project up and running on your machine.

Prerequisites
Node.js (LTS version recommended)

npm or Yarn

A Firebase Project (with Firestore and Authentication enabled)

1. Clone the Repository
git clone https://github.com/lgg6bentley/job-tracker-react-firebase.git
cd job-tracker-react-firebase

2. Install Dependencies
npm install
# or
yarn install

3. Firebase Project Setup
Go to the Firebase Console and create a new project (or use an existing one).

Enable Firestore Database and Authentication (Email/Password provider) for your project.

Register a new Web App in your Firebase project.

Copy your Firebase configuration object.

4. Configure Environment Variables
To securely manage your Firebase credentials, create a .env file in the root of your project (the same directory as package.json).

VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_APP_ID"
VITE_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID" # Only if present

Important: Replace the placeholder values with your actual Firebase configuration details. Ensure string values are enclosed in double quotes.

5. Run the Application
npm run dev
# or
yarn dev

The application will open in your browser, typically at http://localhost:5173/.

🤝 Contributing
Feel free to fork this repository, open issues, or submit pull requests to improve the project.

📄 License
This project is open source and available under the MIT License.
