import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Authentication/LoginForm';
import Home from './LandingPage/Home';
import Dashboard from './Dashboard/Dashboard';
import GymContactSection from './ContactPage/contact-section.tsx';
import GymFeatures from './Dashboard/Feature.js';
import GymDietPlanner from './Dashboard/DietPlanner'; // Importing Diet Planner component
import GymCourses from './Dashboard/GymCourses'; // Importing Courses component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/ContactSection" element={<GymContactSection/>} />
        <Route path="/courses" element={<GymCourses/>} />
        <Route path='/feature' element={<GymFeatures/>} />
        <Route path='/diet' element={<GymDietPlanner/>} />

      </Routes>
    </Router>
  );
}

export default App;
