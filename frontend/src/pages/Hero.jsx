import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
      {/* Bottom-Left Yellow Blob */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-gold rounded-full opacity-20 blur-3xl animate-float"></div>

      {/* Top-Right Teal Blob */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-teal rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Watermark "ONLINE SCHOOL" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-watermark font-bold opacity-5 select-none"
          style={{
            textStroke: '2px rgba(51, 51, 51, 0.1)',
            WebkitTextStroke: '2px rgba(51, 51, 51, 0.1)',
            color: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          ONLINE SCHOOL
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left: Text Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-4 py-2 rounded-full border border-brand-gold/20 animate-fadeInDown" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-brand-gold">Trusted by 50K+ Students Worldwide</span>
          </div>

          {/* Main Heading */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-6xl md:text-7xl font-bold text-dark-text leading-tight mb-4">
              Learn, Grow & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-teal animate-pulse">Succeed</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Unlock your potential with expert-led courses, personalized learning paths, and a community of passionate learners. Your journey to success starts here.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="flex items-start gap-3 animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
              <div className="p-2 bg-brand-gold/10 rounded-lg hover:bg-brand-gold/20 transition">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-dark-text">Expert Instructors</h3>
                <p className="text-sm text-gray-600">Learn from industry professionals</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 animate-slideInRight" style={{ animationDelay: '0.5s' }}>
              <div className="p-2 bg-brand-teal/10 rounded-lg hover:bg-brand-teal/20 transition">
                <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-dark-text">Flexible Learning</h3>
                <p className="text-sm text-gray-600">Learn at your own pace, anytime</p>
              </div>
            </div>

            <div className="flex items-start gap-3 animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
              <div className="p-2 bg-brand-gold/10 rounded-lg hover:bg-brand-gold/20 transition">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-dark-text">Certificates</h3>
                <p className="text-sm text-gray-600">Earn recognized credentials</p>
              </div>
            </div>

            <div className="flex items-start gap-3 animate-slideInRight" style={{ animationDelay: '0.7s' }}>
              <div className="p-2 bg-brand-teal/10 rounded-lg hover:bg-brand-teal/20 transition">
                <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-dark-text">Affordable Pricing</h3>
                <p className="text-sm text-gray-600">Quality education for everyone</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            {!isAuthenticated() ? (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-brand-gold to-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-gold/50 transition transform hover:scale-105 text-center flex items-center justify-center gap-2 animate-bounce-slow"
                >
                  <span>🚀 Get Started Free</span>
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-brand-gold text-brand-gold px-8 py-4 rounded-full font-semibold hover:bg-brand-gold/5 transition text-center hover:scale-105 transform"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/courses"
                  className="bg-gradient-to-r from-brand-gold to-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-gold/50 transition transform hover:scale-105 text-center animate-bounce-slow"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/dashboard"
                  className="border-2 border-brand-gold text-brand-gold px-8 py-4 rounded-full font-semibold hover:bg-brand-gold/5 transition text-center hover:scale-105 transform"
                >
                  My Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-gold">4.9★</p>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-teal">50K+</p>
              <p className="text-xs text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-gold">500+</p>
              <p className="text-xs text-gray-600">Courses</p>
            </div>
          </div>
        </div>

        {/* Right: Visual Section */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-sm">
            {/* Floating Cards */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:translate-y-(-2px) border border-gray-100 animate-slideInRight" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <span className="text-2xl animate-bounce-slow">📚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">500+ Courses</h3>
                    <p className="text-sm text-gray-600">In various fields</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:translate-y-(-2px) border border-gray-100 ml-8 animate-slideInRight" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-teal/10 rounded-lg">
                    <span className="text-2xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>👨‍🏫</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">Expert Teachers</h3>
                    <p className="text-sm text-gray-600">Industry leaders</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:translate-y-(-2px) border border-gray-100 animate-slideInRight" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <span className="text-2xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🏆</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">Certificates</h3>
                    <p className="text-sm text-gray-600">Recognized worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Gradient Circle */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>

      {/* Promotional Section */}
      <div className="relative z-10 bg-gradient-to-r from-brand-gold/10 via-brand-teal/10 to-brand-gold/10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo 1 */}
            <div className="text-center space-y-3 hover:transform hover:scale-105 transition animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="inline-block p-3 bg-brand-gold/20 rounded-lg animate-bounce-slow">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-dark-text">Limited Time Offer</h3>
              <p className="text-gray-600">Get <span className="font-bold text-brand-gold">50% OFF</span> on your first course. Use code: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-brand-gold font-semibold">LEARN50</span></p>
              <p className="text-sm text-gray-500">Valid until December 31, 2025</p>
            </div>

            {/* Promo 2 */}
            <div className="text-center space-y-3 hover:transform hover:scale-105 transition animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="inline-block p-3 bg-brand-teal/20 rounded-lg animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-dark-text">Premium Membership</h3>
              <p className="text-gray-600">Unlock <span className="font-bold text-brand-teal">Unlimited Access</span> to all 500+ courses, live sessions, and 24/7 support for just <span className="line-through text-gray-400">$99/month</span> <span className="font-bold text-brand-gold">$49/month</span></p>
              <p className="text-sm text-gray-500">Cancel anytime, no hidden fees</p>
            </div>

            {/* Promo 3 */}
            <div className="text-center space-y-3 hover:transform hover:scale-105 transition animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="inline-block p-3 bg-brand-gold/20 rounded-lg animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-dark-text">Free Career Guidance</h3>
              <p className="text-gray-600">Sign up today and get <span className="font-bold text-brand-gold">1 Free Session</span> with our career counselors. Get personalized learning paths and job placement assistance!</p>
              <p className="text-sm text-gray-500">Worth $100 - Absolutely Free!</p>
            </div>
          </div>

          {/* Call to Action Banner */}
          <div className="mt-12 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-2xl p-8 text-white text-center relative overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-pulse">🎉 Join Thousands of Successful Learners Today!</h2>
              <p className="text-lg mb-6 opacity-95">Start your learning journey with expert instructors and transform your career in just 30 days.</p>
              <Link
                to="/signup"
                className="inline-block bg-white text-brand-gold px-8 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition transform animate-bounce-slow"
              >
                Claim Your Free Trial Now →
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2 hover:scale-110 transition">
              <span className="text-xl">✓</span>
              <span><strong>10M+</strong> Total Hours Learned</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition">
              <span className="text-xl">✓</span>
              <span><strong>98%</strong> Student Satisfaction</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition">
              <span className="text-xl">✓</span>
              <span><strong>50,000+</strong> Success Stories</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-110 transition">
              <span className="text-xl">✓</span>
              <span><strong>24/7</strong> Support Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
