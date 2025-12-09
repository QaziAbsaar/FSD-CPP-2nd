import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from models import db, User, Course, Enrollment
from auth import register_auth_routes, admin_required

load_dotenv()

app = Flask(__name__, instance_relative_config=True)

# Create instance folder if it doesn't exist
try:
    os.makedirs(app.instance_path, exist_ok=True)
except OSError:
    pass

# Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"sqlite:///{os.path.join(app.instance_path, 'campus.db')}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY", "your-secret-key-change-in-production"
)

# Initialize extensions
db.init_app(app)
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:3007",
                "http://127.0.0.1:3007",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3001",
                "http://127.0.0.1:3001",
            ],
            "allow_headers": ["Content-Type", "Authorization"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "supports_credentials": True,
        }
    },
)
jwt = JWTManager(app)

# Register auth routes
register_auth_routes(app)

# ==================== COURSE ROUTES ====================


@app.route("/api/courses", methods=["GET"])
def get_courses():
    """Get all available courses."""
    try:
        courses = Course.query.all()
        return jsonify([course.to_dict() for course in courses]), 200
    except Exception as e:
        print(f"Error fetching courses: {str(e)}")
        return jsonify({"error": "Failed to fetch courses", "details": str(e)}), 500


@app.route("/api/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    """Get a specific course."""
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(course.to_dict()), 200


@app.route("/api/courses", methods=["POST"])
@admin_required
def create_course():
    """Create a new course (admin only)."""
    from flask import request

    data = request.get_json()

    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    if not data.get("instructor_id"):
        return jsonify({"error": "Instructor ID is required"}), 400

    # Verify instructor exists
    instructor = User.query.get(data.get("instructor_id"))
    if not instructor:
        return jsonify({"error": "Instructor not found"}), 404

    course = Course(
        title=data["title"],
        description=data.get("description", ""),
        instructor_id=data.get("instructor_id"),
        capacity=data.get("capacity", 50),
        image_url=data.get("image_url", ""),
    )

    db.session.add(course)
    db.session.commit()

    return jsonify(course.to_dict()), 201


@app.route("/api/courses/<int:course_id>", methods=["PUT"])
@admin_required
def update_course(course_id):
    """Update a course (admin only)."""
    from flask import request

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    data = request.get_json()

    if data.get("title"):
        course.title = data["title"]
    if data.get("description"):
        course.description = data["description"]
    if data.get("instructor_id"):
        instructor = User.query.get(data.get("instructor_id"))
        if not instructor:
            return jsonify({"error": "Instructor not found"}), 404
        course.instructor_id = data["instructor_id"]
    if data.get("capacity"):
        course.capacity = data["capacity"]
    if data.get("image_url"):
        course.image_url = data["image_url"]

    db.session.commit()

    return jsonify(course.to_dict()), 200


@app.route("/api/courses/<int:course_id>", methods=["DELETE"])
@admin_required
def delete_course(course_id):
    """Delete a course (admin only)."""
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    db.session.delete(course)
    db.session.commit()

    return jsonify({"message": "Course deleted successfully"}), 200


# ==================== ENROLLMENT ROUTES ====================


@app.route("/api/enrollments", methods=["POST"])
@jwt_required()
def enroll_course():
    """Enroll a student in a course."""
    from flask import request

    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data or not data.get("course_id"):
        return jsonify({"error": "Course ID is required"}), 400

    course = Course.query.get(data["course_id"])
    if not course:
        return jsonify({"error": "Course not found"}), 404

    if len(course.enrollments) >= course.capacity:
        return jsonify({"error": "Course is full"}), 400

    existing = Enrollment.query.filter_by(
        user_id=user_id, course_id=data["course_id"]
    ).first()
    if existing:
        return jsonify({"error": "Already enrolled in this course"}), 400

    enrollment = Enrollment(user_id=user_id, course_id=data["course_id"])
    db.session.add(enrollment)
    db.session.commit()

    return jsonify(enrollment.to_dict()), 201


@app.route("/api/enrollments/user/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user_enrollments(user_id):
    """Get enrollments for a specific user."""
    current_user_id = int(get_jwt_identity())
    current_user = User.query.get(current_user_id)

    if current_user_id != user_id and current_user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    enrollments = Enrollment.query.filter_by(user_id=user_id).all()
    return jsonify([e.to_dict() for e in enrollments]), 200


# ==================== USER ROUTES ====================


@app.route("/api/users", methods=["GET"])
def get_users():
    """Get all users."""
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({"error": "Failed to fetch users", "details": str(e)}), 500


@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Get a specific user."""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200


@app.route("/api/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    """Update user profile."""
    from flask import request

    current_user_id = int(get_jwt_identity())

    # Users can only update their own profile unless they're admin
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    current_user = User.query.get(current_user_id)
    if current_user_id != user_id and current_user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    if "email" in data:
        existing = User.query.filter_by(email=data["email"]).first()
        if existing and existing.id != user_id:
            return jsonify({"error": "Email already in use"}), 400
        user.email = data["email"]

    if "password" in data:
        user.set_password(data["password"])

    db.session.commit()
    return jsonify(user.to_dict()), 200


# ==================== JWT ERROR HANDLERS ====================


@jwt.invalid_token_loader
def invalid_token_callback(error):
    print(f"JWT Error Debug: {error}")
    return jsonify({"error": "Invalid token", "details": error}), 422


@jwt.unauthorized_loader
def missing_token_callback(error):
    return (
        jsonify(
            {"error": "Request does not contain an access token", "details": error}
        ),
        401,
    )


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"error": "Token has expired", "details": "token_expired"}), 401


# ==================== HEALTH CHECK ====================


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    try:
        # Try to query the database
        user_count = User.query.count()
        course_count = Course.query.count()

        return (
            jsonify(
                {
                    "status": "ok",
                    "message": "API is running",
                    "database": "connected",
                    "users": user_count,
                    "courses": course_count,
                }
            ),
            200,
        )
    except Exception as e:
        print(f"Health check error: {str(e)}")
        return (
            jsonify(
                {"status": "error", "message": "Health check failed", "error": str(e)}
            ),
            500,
        )


# ==================== DATABASE INITIALIZATION ====================


def init_db():
    """Initialize the database with sample data."""
    with app.app_context():
        db.create_all()

        # Check if admin user exists
        admin = User.query.filter_by(username="admin").first()
        if not admin:
            admin = User(username="admin", email="admin@campushub.com", role="admin")
            admin.set_password("admin123")
            db.session.add(admin)

            # Create sample instructor
            instructor = User(
                username="Prof. Sarah Johnson",
                email="instructor@campushub.com",
                role="instructor",
            )
            instructor.set_password("instructor123")
            db.session.add(instructor)

            db.session.commit()

            # Create sample courses
            course1 = Course(
                title="Introduction to Python",
                description="Learn Python basics from scratch.",
                instructor_id=instructor.id,
                capacity=50,
                image_url="/images/python-intro.png"
            )
            course2 = Course(
                title="Web Development with React",
                description="Master React and modern web development.",
                instructor_id=instructor.id,
                capacity=40,
                image_url="/images/react-dev.png"
            )
            course3 = Course(
                title="Database Design with SQL",
                description="Learn to design and optimize databases.",
                instructor_id=instructor.id,
                capacity=35,
                image_url="/images/sql-design.png"
            )

            db.session.add_all([course1, course2, course3])
            db.session.commit()

            print("Database initialized with sample data!")


@app.route("/api/fix_images", methods=["GET"])
def fix_images():
    """Temporary route to fix image URLs."""
    try:
        # Update Instructor
        instructor = User.query.filter_by(email="instructor@campushub.com").first()
        if instructor:
            instructor.username = "Prof. Sarah Johnson"
            
        # Update Courses
        courses = Course.query.all()
        updated_count = 0
        for course in courses:
            if "Python" in course.title:
                course.image_url = "/images/python-intro.png"
                updated_count += 1
            elif "React" in course.title:
                course.image_url = "/images/react-dev.png"
                updated_count += 1
            elif "SQL" in course.title:
                course.image_url = "/images/sql-design.png"
                updated_count += 1
        
        db.session.commit()
        return jsonify({"message": f"Updated {updated_count} courses"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
