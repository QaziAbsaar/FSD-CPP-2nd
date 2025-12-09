from flask import jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from functools import wraps
from models import User, db


def admin_required(fn):
    """Custom decorator to check if user is admin."""

    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user or user.role != "admin":
            return jsonify({"error": "Admin access required"}), 403

        return fn(*args, **kwargs)

    return wrapper


def register_auth_routes(app):
    """Register authentication routes."""

    @app.route("/api/auth/signup", methods=["POST"])
    def signup():
        from flask import request

        data = request.get_json()

        if (
            not data
            or not data.get("username")
            or not data.get("email")
            or not data.get("password")
        ):
            return jsonify({"error": "Missing required fields"}), 400

        if User.query.filter_by(username=data["username"]).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"error": "Email already exists"}), 400

        user = User(
            username=data["username"],
            email=data["email"],
            role=data.get("role", "student"),
        )
        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=user.id)

        return (
            jsonify(
                {
                    "message": "User created successfully",
                    "user": user.to_dict(),
                    "access_token": access_token,
                }
            ),
            201,
        )

    @app.route("/api/auth/login", methods=["POST"])
    def login():
        from flask import request

        data = request.get_json()

        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"error": "Missing email or password"}), 400

        user = User.query.filter_by(email=data["email"]).first()

        if not user or not user.check_password(data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        access_token = create_access_token(identity=user.id)

        return (
            jsonify(
                {
                    "message": "Login successful",
                    "user": user.to_dict(),
                    "access_token": access_token,
                }
            ),
            200,
        )

    @app.route("/api/auth/me", methods=["GET"])
    @jwt_required()
    def get_current_user():
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify(user.to_dict()), 200
