# 🎓 Campus Hub - Full Stack Academic Platform

A production-ready, custom-built academic platform featuring JWT authentication, role-based access control, and a beautiful LearnPress-inspired design.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup (Flask + SQLite)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

✅ Backend runs on `http://localhost:5000`
✅ SQLite database (`campus.db`) auto-created with sample data

### Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs on `http://localhost:3000`
✅ API proxy configured to backend

## 📋 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@campushub.com | admin123 |
| 👨‍🏫 Instructor | instructor@campushub.com | instructor123 |
| 👨‍🎓 Student | Create new account | Your choice |

---

## 🎨 Design System (LearnPress Vibes)

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Brand Gold | `#FFB606` | Primary buttons, active nav pills, highlights |
| Teal/Mint | `#4DBFAC` | Secondary accent, top-right blob |
| Dark Grey | `#333333` | Headings, main text |
| White | `#FFFFFF` | Background |

### Key Visual Elements
- **Blobs:** Animated, absolute-positioned organic shapes (bottom-left yellow, top-right teal)
- **Watermark:** "ONLINE SCHOOL" text (150px, transparent fill with stroke outline)
- **Buttons:** Fully rounded pill shapes (`rounded-full`)
- **Navigation:** Minimalist with active link wrapped in mustard pill
- **Typography:** Poppins/Nunito serif fonts

---

## 📁 Project Structure

```
FSD_Maaz/
├── backend/
│   ├── app.py                # Flask app with routes
│   ├── models.py             # SQLAlchemy models (User, Course, Enrollment)
│   ├── auth.py               # JWT authentication & decorators
│   ├── requirements.txt       # Python dependencies
│   ├── campus.db            # SQLite database (auto-created)
│   └── README.md            # Backend documentation
│
├── frontend/
│   ├── package.json          # npm dependencies
│   ├── vite.config.js        # Vite config with proxy
│   ├── tailwind.config.js    # Tailwind custom colors
│   ├── index.html            # HTML entry
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx           # Router & routing
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Hero.jsx      # Landing (watermark + blobs!)
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Admin.jsx
│   │   └── utils/
│   │       ├── api.js        # Axios with JWT interceptors
│   │       ├── auth.js       # Auth helpers
│   │       └── routes.jsx    # Protected route components
│   └── README.md
│
├── SETUP.md                  # Detailed setup guide
└── README.md                 # This file
```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/signup      # Register new user
POST   /api/auth/login       # Login & get JWT
GET    /api/auth/me          # Get current user (JWT required)
```

### Courses
```
GET    /api/courses          # List all courses
GET    /api/courses/<id>     # Get course details
POST   /api/courses          # Create course (admin only)
```

### Enrollments
```
POST   /api/enrollments                    # Enroll in course
GET    /api/enrollments/user/<user_id>    # Get user's enrollments
```

### Users
```
GET    /api/users            # Get all users (admin only)
GET    /api/users/<id>       # Get user profile
PUT    /api/users/<id>       # Update profile
```

---

## 🔐 Security Features

✅ **JWT Token Authentication** - Token-based auth with Flask-JWT-Extended
✅ **Bcrypt Password Hashing** - Passwords hashed with salt
✅ **Role-Based Access Control** - Admin, Instructor, Student roles
✅ **Protected Routes** - Frontend guards sensitive pages
✅ **CORS Configured** - Safe cross-origin requests
✅ **Token Interceptors** - Axios auto-adds JWT to requests

---

## 📱 Pages & Features

### Public Pages
- **`/`** - Landing page with hero section, watermark, blobs, call-to-action
- **`/courses`** - Course catalog with enrollment
- **`/login`** - JWT login form
- **`/signup`** - User registration (Student/Instructor selection)

### Protected Pages (Requires Login)
- **`/dashboard`** - Student hub showing enrolled courses & progress
- **`/profile`** - User settings (email, password update)

### Admin Pages (Admin Only)
- **`/admin`** - Admin dashboard with user & course management tables

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast bundler & dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Poppins/Nunito** - Custom fonts

### Backend
- **Flask** - Lightweight Python web framework
- **SQLAlchemy** - ORM for database
- **SQLite** - Lightweight local database
- **Flask-JWT-Extended** - JWT authentication
- **Bcrypt** - Password hashing
- **Flask-CORS** - Cross-origin requests

---

## 🎯 Database Schema

### Users Table
```sql
id (PK) | username | email | password_hash | role | created_at
```

### Courses Table
```sql
id (PK) | title | description | instructor_id (FK) | capacity | created_at
```

### Enrollments Table
```sql
id (PK) | user_id (FK) | course_id (FK) | status | enrolled_at
```

---

## 🚀 Production Deployment

### Checklist
- [ ] Change `JWT_SECRET_KEY` to secure random string
- [ ] Set `FLASK_ENV=production`
- [ ] Build frontend: `npm run build`
- [ ] Use environment variables for secrets
- [ ] Set up database backups
- [ ] Enable HTTPS
- [ ] Configure CORS for your domain
- [ ] Deploy frontend build to CDN or static hosting
- [ ] Deploy backend to server (Heroku, DigitalOcean, AWS, etc.)

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check Python version
python --version

# Reinstall dependencies
pip install -r requirements.txt

# Reset database
rm backend/campus.db
python backend/app.py
```

### Frontend can't reach backend?
```bash
# Ensure backend running on port 5000
# Check vite.config.js proxy settings
# Verify /api requests in browser DevTools
```

### JWT errors?
```bash
# Clear localStorage
localStorage.clear()

# Logout and login again
```

---

## 📚 Documentation

- **Backend Docs:** See `backend/README.md`
- **Frontend Docs:** See `frontend/README.md`
- **Setup Guide:** See `SETUP.md` for detailed instructions

---

## 💡 Key Highlights

✨ **Zero WordPress Dependency** - Built entirely from scratch
✨ **Beautiful UI** - LearnPress-inspired with custom Tailwind design
✨ **Secure Auth** - JWT tokens + Bcrypt + role-based access
✨ **Production Ready** - Error handling, validation, interceptors
✨ **Scalable** - Modular component structure, RESTful API
✨ **Developer Friendly** - Clear code organization, comprehensive comments

---

## 🤝 Contributing

Feel free to extend Campus Hub with:
- Course materials upload/download
- Video streaming integration
- Discussion forums
- Quizzes & assessments
- Progress tracking
- Email notifications
- Payment integration

---

## 📄 License

This project is open source. Use it for learning and educational purposes.

---

**Built with ❤️ as a production-ready Full Stack Application**

Start learning with Campus Hub today! 🚀
