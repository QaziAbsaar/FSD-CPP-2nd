# Campus Hub - Full Stack Setup Guide

## Project Structure

```
FSD_Maaz/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── models.py              # SQLAlchemy models (User, Course, Enrollment)
│   ├── auth.py                # JWT authentication & decorators
│   ├── requirements.txt        # Python dependencies
│   ├── campus.db             # SQLite database (auto-created)
│   └── README.md             # Backend docs
│
└── frontend/
    ├── package.json           # npm dependencies
    ├── vite.config.js         # Vite configuration
    ├── tailwind.config.js     # Tailwind CSS config
    ├── postcss.config.js      # PostCSS config
    ├── index.html             # HTML entry point
    ├── src/
    │   ├── main.jsx          # React entry point
    │   ├── App.jsx           # Main app component with routing
    │   ├── index.css         # Global styles
    │   ├── components/
    │   │   └── Navbar.jsx    # Navigation component
    │   ├── pages/
    │   │   ├── Hero.jsx      # Landing page (with watermark & blobs)
    │   │   ├── Login.jsx     # Login page
    │   │   ├── Signup.jsx    # Sign up page
    │   │   ├── Dashboard.jsx # Student dashboard (protected)
    │   │   ├── Courses.jsx   # Course catalog
    │   │   ├── Profile.jsx   # User profile settings
    │   │   └── Admin.jsx     # Admin panel (protected, admin-only)
    │   └── utils/
    │       ├── api.js        # Axios instance with interceptors
    │       ├── auth.js       # Auth utilities (JWT, localStorage)
    │       └── routes.jsx    # Protected route components
    └── README.md             # Frontend docs
```

## Quick Start

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will:
- Create `campus.db` SQLite database
- Initialize schema
- Seed sample data (admin user, instructor, 3 courses)
- Run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will:
- Run on `http://localhost:3000`
- Proxy API requests to backend at `/api`

### 3. Access the Application

- **Homepage:** http://localhost:3000
- **Login:** Use demo credentials from login page
- **Admin Panel:** Login as admin to access `/admin`

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@campushub.com | admin123 |
| Instructor | instructor@campushub.com | instructor123 |
| Student | *Create new in signup* | *Your choice* |

## Key Features

### Frontend
- ✅ Landing page with "ONLINE SCHOOL" watermark and animated blobs
- ✅ LearnPress-inspired design (Mustard gold #FFB606, Teal #4DBFAC)
- ✅ JWT authentication with localStorage
- ✅ Protected routes (Dashboard, Profile, Admin)
- ✅ Course catalog with enrollment
- ✅ Student dashboard
- ✅ User profile management
- ✅ Admin dashboard (users & courses tables)

### Backend
- ✅ RESTful API with Flask
- ✅ SQLite database with SQLAlchemy ORM
- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ Role-based access control
- ✅ CORS enabled
- ✅ Request validation

## Design System

### Colors
- **Primary (Brand Gold):** #FFB606 (use for active nav, buttons, highlights)
- **Secondary (Teal):** #4DBFAC (accent color, top-right blob)
- **Text (Dark Grey):** #333333 (headings, main text)
- **Background:** #FFFFFF (clean white)

### Typography
- **Font Family:** Poppins, Nunito, Sans-serif
- **Hero Watermark:** 150px bold text with transparent fill and stroke outline

### Components
- **Buttons:** Fully rounded (`rounded-full`) pill shape
- **Navigation Pills:** Active nav link wrapped in mustard pill
- **Blobs:** Absolute positioned, organic shapes with blur effect
- **Cards:** Subtle shadows, rounded corners

## API Response Format

All endpoints return JSON:

```json
{
  "message": "Success message",
  "data": { /* response data */ },
  "access_token": "jwt-token-if-applicable"
}
```

Error responses:
```json
{
  "error": "Error description"
}
```

## Authentication Flow

1. **Signup/Login** → POST request to backend
2. **Receive JWT token** → Stored in localStorage
3. **Include in requests** → Axios adds `Authorization: Bearer {token}` header
4. **Token validation** → Backend checks JWT signature
5. **Protected routes** → Frontend checks token before rendering
6. **Token expiration** → Axios interceptor redirects to login if 401

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.8+

# Verify dependencies
pip install -r requirements.txt

# Remove old database to reset
rm campus.db
python app.py
```

### Frontend won't connect to backend
```bash
# Check proxy in vite.config.js
# Backend must run on port 5000
# Frontend runs on port 3000
```

### CORS errors
- Ensure `Flask-CORS` is installed
- Backend has `CORS(app)` configured

### JWT token issues
- Check `JWT_SECRET_KEY` in `.env`
- Verify token is set in localStorage after login
- Clear localStorage if experiencing issues: `localStorage.clear()`

## Deployment Notes

### Production Checklist
- [ ] Change `JWT_SECRET_KEY` to secure random string
- [ ] Set `FLASK_ENV=production`
- [ ] Use environment variables for sensitive data
- [ ] Set up proper database backups
- [ ] Enable HTTPS
- [ ] Configure CORS for your domain
- [ ] Build frontend: `npm run build`
- [ ] Serve frontend build directory

## Development Tips

- Hot Module Replacement (HMR) is enabled in Vite
- Flask debug mode auto-reloads on code changes
- Check browser DevTools Network tab to debug API calls
- Use Redux DevTools or React Query DevTools if added later

---

**Campus Hub** - A production-ready full-stack academic platform! 🎓
