# DevPlatform

DevPlatform is a full-stack developer community platform where developers can create posts, share knowledge, discuss through comments and replies, react to content, and maintain professional developer profiles.

The application is built with a React frontend and Node.js/Express backend with PostgreSQL database integration. It provides real API-driven functionality instead of static frontend-only data.

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Swagger/OpenAPI Documentation

### Database
- PostgreSQL

## Core Features

### Authentication
- User registration
- User login
- JWT access token authentication
- Protected routes for authenticated actions
- Logout functionality

### Developer Profiles
- Create developer profile
- View developer profile
- Update developer information
- Manage skills and experiences

### Posts
- Create posts
- View developer feed
- View post details
- Image and video media support
- Ranked post feed

### Comments and Replies
- Create comments on posts
- View comments
- Threaded comment replies
- Nested discussion flow

### Reactions
- Like and dislike posts and comments
- Reaction count tracking

## Ranking System

Posts are ranked based on engagement score:

```
score = (likes - dislikes) + (comment_count * 2)
```

Higher scoring posts appear first.

If multiple posts have the same score, newer posts are preferred.

## Project Structure

```
backend
├── src
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
```

```
frontend
├── src
│   ├── pages
│   ├── components
│   ├── api
│   ├── context
│   ├── hooks
│   └── styles
```

## Local Setup

### Clone Repository

```
git clone <repository-url>

cd dev-platform
```

### Backend Setup

```
cd backend

npm install

npm run dev
```

Create `.env` file:

```
PORT=
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
```

### Frontend Setup

```
cd frontend

npm install

npm run dev
```

Create `.env` file:

```
VITE_API_URL=
```

# API Documentation

Swagger/OpenAPI documentation is available for all documented backend APIs.

After starting the backend server, open:

http://localhost:5000/api-docs/


## API Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": []
}
```

## AI Usage

AI development workflow, prompts, review process, and validated bug fixes are documented in:

`AI_USAGE.md`

## Assumptions

- Backend API is treated as the source of truth for data structures.
- JWT access tokens are used for authentication.
- Frontend communicates with backend through configured API endpoints.
- Media handling follows the existing backend upload configuration.

## Known Limitations

- Refresh token system is not implemented.
- Automated backend test suite is not included.
- Search and pagination features are not included.
- Deployment configuration is not included.
- Advanced UI features such as real-time notifications are not included.