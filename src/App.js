import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Authentication/LoginForm';
import Home from './LandingPage/Home';
import Dashboard from './Dashboard/Dashboard';
import SettingsSection from './Dashboard/SettingsSection.tsx';
import GymCourses from './Dashboard/GymCourses.js';
import GymContactSection from './ContactPage/gym-contact-section.tsx';
import Feature from './Feature/Feature.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsSection/>} />
        <Route path="/courses" element={<GymCourses/>} />
        <Route path="/ContactSection" element={<GymContactSection/>} />
        <Route path="/Feature" element={<Feature/>} />
      </Routes>
    </Router>
  );
}

export default App;
