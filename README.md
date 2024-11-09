Collaborative Task Management App
A real-time, collaborative task management system for teams, designed to streamline task assignment, progress tracking, and communication. Inspired by Agile methodologies, this app offers project and task management, real-time updates, activity tracking, and a user-friendly interface.

Table of Contents
Features
Technologies Used
Setup
Usage
API Documentation
Contributing
License
Features
User Registration & Authentication:

To run the backend in one tab, navigate to
https://collaborative-task-management-app.onrender.com

To run the frontend in another tab, navigate to
https://collaborative-task-management-app-9dtp-eukwt2ahc.vercel.app

Secure user authentication with Passport.js or JWT.
User profile management with role-based permissions for Admins and Regular Users.
Managed with Prisma and PostgreSQL.
Project & Task Management:

Create, assign, and track tasks with due dates and statuses (To Do, In Progress, Done).
Projects contain multiple tasks, each assignable to individual users.
Real-time Updates:

Powered by Socket.io for instant updates on task changes, new assignments, and progress.
Real-time activity feed for team updates and task changes.
Activity Feed:

Logs activity in real time, displaying actions like task completion and project updates.
Kanban Board:

User-friendly, responsive Kanban board interface for task status tracking.
Notifications System (optional):

In-app notifications for task assignments and status changes.
Technologies Used
Frontend:

React - User interface built with React.
Responsive design for a clean, user-friendly experience.
Backend:

Node.js - Server environment.
Express - API and backend logic.
Socket.io - WebSocket protocol for real-time updates.
Prisma - ORM for database management.
Database:

PostgreSQL - Relational database.
Setup
Quick Access
Backend: Access the backend by opening collaborative-task-management-app.onrender.com in a new tab.
Frontend: Access the frontend by opening collaborative-task-management-app-9dtp-508wae1hc.vercel.app in another tab.
Repository
The complete code repository is available on GitHub:

Collaborative Task Management App - GitHub Repo

GitHub: https://github.com/lyepez-glitch/Collaborative-Task-Management-App

Usage
Open the frontend and backend links in separate tabs to access the app.
Register or log in to create a new account.
Create a new project and start adding tasks with due dates and assigned users.
Use the Kanban board to manage task statuses and track project progress.
Notifications and the activity feed will keep team members informed of updates in real time.
API Documentation
API documentation is provided for all backend endpoints, allowing developers to understand and extend the API as needed.

Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request. Ensure that:

Code follows project guidelines.
New features are documented in the API documentation.
README is updated for significant changes.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

