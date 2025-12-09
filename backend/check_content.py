
from app import app, db, User, Course

def check_data():
    with app.app_context():
        courses = Course.query.all()
        for course in courses:
            print(f"Course: {course.title}, Image: {course.image_url}")

if __name__ == "__main__":
    check_data()
