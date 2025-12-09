from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="student")  # admin, student, instructor
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    enrolled_courses = db.relationship(
        "Enrollment", back_populates="user", cascade="all, delete-orphan"
    )
    courses_created = db.relationship(
        "Course", back_populates="instructor", foreign_keys="Course.instructor_id"
    )

    def set_password(self, password):
        """Hash and set the password using werkzeug."""
        self.password_hash = generate_password_hash(password, method="pbkdf2:sha256")

    def check_password(self, password):
        """Check if provided password matches the hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "created_at": self.created_at.isoformat(),
        }


class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    instructor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    capacity = db.Column(db.Integer, default=50)
    image_url = db.Column(db.String(500), default="")  # URL to course image
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    instructor = db.relationship(
        "User", back_populates="courses_created", foreign_keys=[instructor_id]
    )
    enrollments = db.relationship(
        "Enrollment", back_populates="course", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "instructor_id": self.instructor_id,
            "instructor_name": self.instructor.username if self.instructor else None,
            "capacity": self.capacity,
            "image_url": self.image_url or "",
            "enrolled_count": len(self.enrollments),
            "created_at": self.created_at.isoformat(),
        }


class Enrollment(db.Model):
    __tablename__ = "enrollments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    status = db.Column(db.String(20), default="active")  # active, completed, dropped
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship("User", back_populates="enrolled_courses")
    course = db.relationship("Course", back_populates="enrollments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "course_id": self.course_id,
            "course_title": self.course.title if self.course else None,
            "status": self.status,
            "enrolled_at": self.enrolled_at.isoformat(),
        }
