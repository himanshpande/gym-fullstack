import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for redirection
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Hardcoded credentials
  const hardcodedEmail = 'admin@example.com';
  const hardcodedPassword = 'password123';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === hardcodedEmail && password === hardcodedPassword) {
      navigate('/home'); // Redirect to home page
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
