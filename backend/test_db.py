#!/usr/bin/env python
"""Database Connection Test Script"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from app import app, db
from models import User, Course, Enrollment

print("=" * 60)
print("DATABASE CONNECTION TEST")
print("=" * 60)

# Test 1: Check database file exists
print("\n1️⃣  Checking database file location...")
db_path = os.path.join(app.instance_path, "campus.db")
print(f"   Database path: {db_path}")
print(f"   Database exists: {os.path.exists(db_path)}")

# Test 2: Test connection
print("\n2️⃣  Testing database connection...")
try:
    with app.app_context():
        # Query users
        users = User.query.all()
        print(f"   ✅ Connected successfully!")
        print(f"   Total users: {len(users)}")

        # Query courses
        courses = Course.query.all()
        print(f"   Total courses: {len(courses)}")

        # Query enrollments
        enrollments = Enrollment.query.all()
        print(f"   Total enrollments: {len(enrollments)}")

        # List all users
        print(f"\n3️⃣  Users in database:")
        for user in users:
            print(f"      - {user.username} ({user.email}) - Role: {user.role}")

        # List all courses
        print(f"\n4️⃣  Courses in database:")
        for course in courses:
            print(
                f"      - {course.title} (Instructor: {course.instructor.username}, Capacity: {course.capacity})"
            )

        # Test API endpoints
        print(f"\n5️⃣  Testing API endpoints...")

        # Test GET /api/users
        print(f"   Testing: GET /api/users")
        with app.test_client() as client:
            response = client.get("/api/users")
            print(f"   Status: {response.status_code}")
            if response.status_code == 200:
                print(f"   ✅ Users endpoint working!")
            else:
                print(f"   ❌ Users endpoint failed: {response.data}")

        # Test GET /api/courses
        print(f"   Testing: GET /api/courses")
        with app.test_client() as client:
            response = client.get("/api/courses")
            print(f"   Status: {response.status_code}")
            if response.status_code == 200:
                print(f"   ✅ Courses endpoint working!")
            else:
                print(f"   ❌ Courses endpoint failed: {response.data}")

        print(f"\n✅ All tests passed! Database is working correctly.")

except Exception as e:
    print(f"   ❌ Connection failed: {str(e)}")
    import traceback

    traceback.print_exc()

print("\n" + "=" * 60)
