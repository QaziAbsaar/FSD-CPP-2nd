import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { getUser } from '../utils/auth';

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get(`/enrollments/user/${user.id}`);
        setEnrollments(response.data);
      } catch (err) {
        console.error('Failed to fetch enrollments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark-text mb-2">Welcome, {user?.username}!</h1>
          <p className="text-gray-600">Here's your learning dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-brand-gold">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Enrolled Courses</h3>
            <p className="text-3xl font-bold text-brand-gold">{enrollments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-brand-teal">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-brand-teal">
              {enrollments.filter(e => e.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-400">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Completed</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {enrollments.filter(e => e.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-dark-text mb-6">My Courses</h2>

          {loading ? (
            <p className="text-gray-600">Loading your courses...</p>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <a
                href="/courses"
                className="inline-block bg-brand-gold text-white px-6 py-3 rounded-full hover:bg-yellow-500 transition"
              >
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-dark-text flex-1">{enrollment.course_title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      enrollment.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : enrollment.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}</p>
                  <button className="mt-4 w-full border border-brand-gold text-brand-gold py-2 rounded-lg hover:bg-brand-gold hover:text-white transition">
                    View Course
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
