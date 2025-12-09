import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { getUser } from '../utils/auth';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEnrollments, setUserEnrollments] = useState(new Set());
  const user = getUser();

  const [error, setError] = useState(null);

  const fetchUserEnrollments = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/enrollments/user/${user.id}`);
      const enrolledIds = new Set(response.data.map(e => e.course_id));
      setUserEnrollments(enrolledIds);
    } catch (err) {
      console.error('Failed to fetch enrollments:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      setError(null);
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load courses. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchUserEnrollments();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post('/enrollments', { course_id: courseId });
      alert('Successfully enrolled in the course!');
      fetchCourses(); // Refresh list to show updated count
      fetchUserEnrollments(); // Refresh status
    } catch (err) {
      console.error('Enrollment error:', err);
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
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const isEnrolled = userEnrollments.has(course.id);
              const isFull = course.enrolled_count >= course.capacity;
              
              return (
              <div key={course.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Course Header */}
                <div className="h-48 overflow-hidden bg-gray-100">
                  {course.image_url ? (
                    <img 
                      src={course.image_url} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={
                        course.title.includes('Python') ? '/images/python-intro.png' :
                        course.title.includes('React') ? '/images/react-dev.png' :
                        course.title.includes('SQL') ? '/images/sql-design.png' :
                        null
                      }
                      alt={course.title}
                      className={
                        (course.title.includes('Python') || course.title.includes('React') || course.title.includes('SQL')) 
                        ? "w-full h-full object-cover" 
                        : "hidden"
                      } 
                    />
                  )}
                  {(!course.image_url && !course.title.includes('Python') && !course.title.includes('React') && !course.title.includes('SQL')) && (
                     <div className="w-full h-full bg-gradient-to-r from-brand-gold to-brand-teal"></div>
                  )}
                </div>

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
                    disabled={isEnrolled || isFull}
                    className={`w-full py-3 rounded-full font-semibold transition ${
                      isEnrolled
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : isFull
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-brand-gold text-white hover:bg-yellow-500'
                    }`}
                  >
                    {isEnrolled ? 'Enrolled' : isFull ? 'Course Full' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
