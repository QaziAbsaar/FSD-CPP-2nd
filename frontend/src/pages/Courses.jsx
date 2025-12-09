import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post('/enrollments', { course_id: courseId });
      alert('Successfully enrolled in the course!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to enroll in course');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-dark-text mb-2">Available Courses</h1>
          <p className="text-gray-600">Explore our catalog of courses and start learning today</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Course Header */}
                <div className="h-32 bg-gradient-to-r from-brand-gold to-brand-teal"></div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark-text mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description || 'No description available'}</p>

                  {/* Course Meta */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Instructor:</span>
                      <span className="font-semibold">{course.instructor_name}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Enrolled:</span>
                      <span className="font-semibold">{course.enrolled_count} / {course.capacity}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                      className="bg-brand-gold h-2 rounded-full"
                      style={{ width: `${(course.enrolled_count / course.capacity) * 100}%` }}
                    ></div>
                  </div>

                  {/* Enroll Button */}
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full bg-brand-gold text-white py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
