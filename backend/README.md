# Campus Hub - Backend

Flask-based REST API for Campus Hub, featuring SQLite database, JWT authentication, and role-based access control.

## Installation

```bash
pip install -r requirements.txt
```

## Running the Server

```bash
python app.py
```

The API will run on `http://localhost:5000`

## Database

The SQLite database (`campus.db`) is automatically created on first run with sample data:

- **Admin User:** admin@campushub.com / admin123
- **Instructor User:** instructor@campushub.com / instructor123
- **Sample Courses:** 3 courses created by the instructor

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user info (requires JWT)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/<id>` - Get specific course
- `POST /api/courses` - Create course (admin only)

### Enrollments
- `POST /api/enrollments` - Enroll in a course (requires JWT)
- `GET /api/enrollments/user/<user_id>` - Get user's enrollments

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/<id>` - Get specific user
- `PUT /api/users/<id>` - Update user profile

### Health
- `GET /api/health` - Health check

## Tech Stack

- Flask 3.0
- SQLAlchemy ORM
- Flask-JWT-Extended
- Bcrypt for password hashing
- SQLite database

## Environment Variables

Create a `.env` file:

```
JWT_SECRET_KEY=your-secret-key-change-in-production
FLASK_ENV=development
```

## Database Schema

**Users Table**
- id (Primary Key)
- username (Unique)
- email (Unique)
- password_hash
- role (admin, student, instructor)
- created_at

**Courses Table**
- id (Primary Key)
- title
- description
- instructor_id (Foreign Key → Users)
- capacity
- created_at

**Enrollments Table**
- id (Primary Key)
- user_id (Foreign Key → Users)
- course_id (Foreign Key → Courses)
- status (active, completed, dropped)
- enrolled_at

## Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ Role-based access control (@admin_required decorator)
- ✅ CORS enabled for frontend integration
- ✅ Request validation
