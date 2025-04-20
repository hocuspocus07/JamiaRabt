# JamiaRabt

## Overview

The Alumni Network Platform is a full-stack web application designed to connect alumni from educational institutions. It provides features for alumni to create profiles, share posts, interact with each other, and search for fellow alumni based on various criteria like graduation year, course, profession, and skills.

## Features

### User Management

- User registration and authentication (JWT)
- Profile management (personal and professional details)
- Avatar upload (Cloudinary integration)

### Mobile Responsiveness

-Mobile-optimized interface with responsive layouts

### Alumni Directory

- Search and filter alumni by:
  - Graduation year
  - Course
  - Profession
  - Skills
  - Location
- View detailed alumni profiles
- Update professional information
- Add achievements and experiences

### Community Feed

- Create, read, update, and delete posts
- Like/unlike posts
- Add comments to posts
- Post with images (Cloudinary integration)

### Messaging

- Real-time chat functionality (implementation pending)

## Technologies Used

### Backend

- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **Cloudinary** for image storage
- **JWT** for authentication
- **Multer** for file uploads
- **CORS** for cross-origin requests
- **Dotenv** for environment variables

### Frontend

- **React** with **Vite** build tool
- **Tailwind CSS** for styling
- **React Router** for navigation
- **ESLint** for code quality

## Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── app.js               # Express app configuration
│   ├── constants.js         # Application constants
│   ├── index.js             # Server entry point
│   ├── controllers/         # Route controllers
│   │   ├── alumni.controller.js
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   ├── db/                  # Database connection
│   ├── middlewares/         # Custom middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── utils/               # Utility functions
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── assets/              # Static assets
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hocuspocus07/JamiaRabt
   cd hocuspocus07-jamiarabt/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   MONGODB_URI=<your-mongodb-uri>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ACCESS_TOKEN_SECRET=<your-jwt-access-token-secret>
   REFRESH_TOKEN_SECRET=<your-jwt-refresh-token-secret>
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   CORS_ORIGIN=<frontend-url>
   PORT=8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/users/refresh-token` - Refresh access token

### User Profile

- `GET /api/v1/users/current-user` - Get current user profile
- `PATCH /api/v1/users/update-account` - Update account details
- `PATCH /api/v1/users/avatar` - Update user avatar

### Alumni Directory

- `GET /api/v1/alumni/search` - Search and filter alumni
- `GET /api/v1/alumni/:id` - Get alumni profile
- `PATCH /api/v1/alumni/update-profile` - Update professional profile
- `POST /api/v1/alumni/achievements` - Add achievement

### Community Posts

- `POST /api/v1/posts` - Create a new post
- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:postId` - Get a specific post
- `PATCH /api/v1/posts/:postId` - Update a post
- `DELETE /api/v1/posts/:postId` - Delete a post
- `POST /api/v1/posts/:postId/like` - Like/unlike a post
- `POST /api/v1/posts/:postId/comment` - Add comment to a post

## Environment Variables

### Backend

- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `ACCESS_TOKEN_SECRET`: Secret for JWT access tokens
- `REFRESH_TOKEN_SECRET`: Secret for JWT refresh tokens
- `ACCESS_TOKEN_EXPIRY`: Access token expiry time
- `REFRESH_TOKEN_EXPIRY`: Refresh token expiry time
- `CORS_ORIGIN`: Allowed origin for CORS
- `PORT`: Server port

## Deployment

### Backend Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## Contact

For any questions or support, please contact the project maintainers.
