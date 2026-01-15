# 📧 ReachInbox – Email Scheduling System

A full-stack email scheduling application that allows authenticated users to schedule single or bulk emails for future delivery using a persistent job queue.

---

## Features

- Google OAuth authentication
- Session-based login (cookies)
- Compose and schedule emails
- Upload CSV / TXT files for bulk email scheduling
- Delayed email execution using BullMQ (no cron)
- Dashboard with:
  - Scheduled emails (includes failed emails)
  - Sent emails
- Background worker for email processing
- Email sending via **Ethereal SMTP**
- Persistent storage using MongoDB
- Redis-backed job queue

---

## Tech Stack

### Frontend
- React + TypeScript
- Bootstrap
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Redis
- BullMQ
- Passport.js (Google OAuth)
- Nodemailer

---

## Authentication

- Google OAuth implemented using Passport.js
- Session-based authentication
- Secure cookies shared between frontend and backend
- User profile details shown in header after login

---

## Email Scheduling Logic

- Emails are stored in MongoDB with status:
  - `scheduled`
  - `sent`
  - `failed`
- Each scheduled email is added to a BullMQ queue with a calculated delay
- A background worker processes emails when the delay expires
- No cron jobs are used

---

## Bulk Email (CSV Upload)

- Users can upload `.csv` or `.txt` files
- Emails are extracted on the frontend
- Emails are scheduled sequentially with a small delay between each send
- Helps prevent rate limiting

Example CSV:
```
email
user1@example.com
user2@example.com
user3@example.com
```

---

## Worker Architecture

- Worker runs as a separate Node.js process
- Connects independently to MongoDB and Redis
- Processes BullMQ jobs
- Updates email status based on success or failure

---

## Email Sending

- Ethereal SMTP is used for testing
- Preview URLs are logged in the worker console
- No real emails are sent during evaluation

---

## Environment Variables

### Backend (`backend/.env`)

```
MONGO_URI=
REDIS_URL=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:4000
```

---

## Running Locally

### Prerequisites
- Node.js
- MongoDB
- Redis

### Backend

```
cd backend
npm install
npm run build
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

- Frontend can be deployed on **Netlify**
- Backend can be deployed on **Render**

---

Happy Coding!