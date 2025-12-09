
from app import app, db, User, Course

def update_data():
    with app.app_context():
        # Update Instructor
        instructor = User.query.filter_by(email="instructor@campushub.com").first()
        if instructor:
            instructor.username = "Prof. Sarah Johnson"
            
        # Update Courses
        courses = Course.query.all()
        for course in courses:
            if "Python" in course.title:
                course.image_url = "/images/python-intro.png"
            elif "React" in course.title:
                course.image_url = "/images/react-dev.png"
            elif "SQL" in course.title:
                course.image_url = "/images/sql-design.png"
        
        db.session.commit()
        print("Database updated.")

if __name__ == "__main__":
    update_data()
