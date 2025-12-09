import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  
  // Form states
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    instructor_id: '',
    capacity: 50,
    image_url: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        api.get('/users'),
        api.get('/courses')
      ]);
      setUsers(usersRes.data);
      setCourses(coursesRes.data);
      // Filter instructors
      setInstructors(usersRes.data.filter(u => u.role === 'instructor' || u.role === 'admin'));
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setErrorMsg('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.instructor_id) {
      setErrorMsg('Please fill in all required fields');
      return;
    }

    try {
      const response = await api.post('/courses', courseForm);
      setCourses([...courses, response.data]);
      setCourseForm({ title: '', description: '', instructor_id: '', capacity: 50, image_url: '' });
      setImagePreview('');
      setShowCourseForm(false);
      setSuccessMsg('Course added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to add course');
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.instructor_id) {
      setErrorMsg('Please fill in all required fields');
      return;
    }

    try {
      const response = await api.put(`/courses/${editingCourse.id}`, courseForm);
      setCourses(courses.map(c => c.id === editingCourse.id ? response.data : c));
      setCourseForm({ title: '', description: '', instructor_id: '', capacity: 50, image_url: '' });
      setImagePreview('');
      setEditingCourse(null);
      setShowCourseForm(false);
      setSuccessMsg('Course updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to update course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.delete(`/courses/${courseId}`);
      setCourses(courses.filter(c => c.id !== courseId));
      setSuccessMsg('Course deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to delete course');
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description || '',
      instructor_id: course.instructor_id,
      capacity: course.capacity,
      image_url: course.image_url || ''
    });
    setImagePreview(course.image_url || '');
    setShowCourseForm(true);
  };

  const handleCancel = () => {
    setCourseForm({ title: '', description: '', instructor_id: '', capacity: 50, image_url: '' });
    setImagePreview('');
    setEditingCourse(null);
    setShowCourseForm(false);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dark-text mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, courses, and system settings</p>
        </div>

        {/* Success/Error Messages */}
        {successMsg && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeInDown">
            ✓ {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fadeInDown">
            ✗ {errorMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === 'courses'
                ? 'bg-brand-gold text-white'
                : 'bg-white text-dark-text border border-gray-200 hover:border-brand-gold'
            }`}
          >
            📚 Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === 'users'
                ? 'bg-brand-gold text-white'
                : 'bg-white text-dark-text border border-gray-200 hover:border-brand-gold'
            }`}
          >
            👥 Users ({users.length})
          </button>
        </div>

        {/* Courses Tab - with CRUD */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Add/Edit Course Form */}
            {showCourseForm && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-brand-gold/30 animate-slideInDown">
                <h2 className="text-2xl font-bold text-dark-text mb-6">
                  {editingCourse ? '✏️ Edit Course' : '➕ Add New Course'}
                </h2>
                <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Course Title */}
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">Course Title *</label>
                      <input
                        type="text"
                        placeholder="e.g., Advanced React Patterns"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold"
                        required
                      />
                    </div>

                    {/* Instructor Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">Assign Instructor *</label>
                      <select
                        value={courseForm.instructor_id}
                        onChange={(e) => setCourseForm({...courseForm, instructor_id: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold"
                        required
                      >
                        <option value="">Select an instructor</option>
                        {instructors.map(instructor => (
                          <option key={instructor.id} value={instructor.id}>
                            {instructor.username} ({instructor.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">Course Capacity</label>
                      <input
                        type="number"
                        placeholder="50"
                        value={courseForm.capacity}
                        onChange={(e) => setCourseForm({...courseForm, capacity: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold"
                        min="1"
                        max="500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">Description</label>
                    <textarea
                      placeholder="Course description and key topics..."
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">Course Image URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={courseForm.image_url}
                      onChange={(e) => {
                        setCourseForm({...courseForm, image_url: e.target.value});
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold"
                    />
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-dark-text mb-2">📷 Image Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Course preview" 
                          className="h-40 w-full object-cover rounded-lg border-2 border-brand-gold/30"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-brand-gold to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      {editingCourse ? '💾 Update Course' : '➕ Add Course'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-dark-text px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Add Course Button */}
            {!showCourseForm && (
              <button
                onClick={() => setShowCourseForm(true)}
                className="bg-gradient-to-r from-brand-gold to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition animate-bounce-slow"
              >
                ➕ Add New Course
              </button>
            )}

            {/* Courses Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-brand-gold/10 to-brand-teal/10 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Course Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Instructor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Capacity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Enrolled</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Created</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-dark-text">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                          No courses yet. Create your first course!
                        </td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            {course.image_url ? (
                              <img 
                                src={course.image_url} 
                                alt={course.title}
                                className="h-12 w-16 object-cover rounded border border-gray-300"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/64x48?text=No+Image';
                                }}
                              />
                            ) : (
                              <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                No image
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-dark-text">{course.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{course.instructor_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{course.capacity}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                              {course.enrolled_count || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(course.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-center space-x-2">
                            <button
                              onClick={() => handleEditCourse(course)}
                              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-brand-gold/10 to-brand-teal/10 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-dark-text font-semibold">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-red-100 text-red-700'
                            : user.role === 'instructor'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
