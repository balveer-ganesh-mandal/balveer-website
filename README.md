# Ganpati Mandal Management System

A comprehensive web application for managing Ganpati Mandal activities, events, committee members, and finances.

## Features

- **Frontend (Next.js)**: Modern, responsive user interface for displaying Mandal information, committee members, and events.
- **Backend (Node.js/Express)**: Robust REST API with MongoDB for data persistence.
- **Admin Panel**: Secure dashboard for managing events, committee members, gallery, and live stream status.

## Project Structure

The project is divided into two main parts:

- `frontend/`: Next.js application (React, Tailwind CSS)
- `backend/`: Node.js/Express application (REST API, MongoDB)

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)
- npm or yarn

## Getting Started

### 1. Database Setup

Ensure you have a MongoDB instance running. Update the `.env` file in the `backend` directory with your connection string.

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev # or npm start
```

The backend server will run on `http://localhost:5000` (or as configured in your `.env`).

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at `http://localhost:3000`.

## Environment Variables

### Backend (`backend/.env`)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `CLOUDINARY_CLOUD_NAME`: (Optional) For image uploads
- `CLOUDINARY_API_KEY`: (Optional) For image uploads
- `CLOUDINARY_API_SECRET`: (Optional) For image uploads

### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:5000/api`)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
