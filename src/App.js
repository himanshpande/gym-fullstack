import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Authentication/LoginForm';
import Home from './LandingPage/Home';
import Dashboard from './Dashboard/Dashboard';
import SettingsSection from './Dashboard/SettingsSection.tsx';
import GymCourses from './Dashboard/CourseGrid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsSection/>} />
        <Route path="/courses" element={<GymCourses/>} />
      </Routes>
    </Router>
  );
}

export default App;
