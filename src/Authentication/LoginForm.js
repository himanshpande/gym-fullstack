import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginForm.css';
import loginImage from 'C:/Users/GG Custom Computers/Documents/muicontainer/muicomponents/src/loginiamge.png';
import Loader from '../Loader/Loader.jsx';

function LoginForm() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const hardcodedEmail = 'admin@example.com';
  const hardcodedPassword = 'password123';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      setIsLoading(true);
      setTimeout(() => {
        if (email === hardcodedEmail && password === hardcodedPassword) {
          navigate('/home');
        } else {
          setIsLoading(false);
          alert('Invalid email or password');
        }
      }, 1500); // Simulate loading
    } else {
      alert(`Account created for ${name}`);
      setIsLogin(true);
    }
  };

  return (
    <div className="dark-container">
      {isLoading && <Loader isVisible={isLoading} />}
      {!isLoading && (
        <div className="glass-card" data-aos="zoom-in">
          <div className="image-section" data-aos="fade-right">
            <img src={loginImage} alt="Login Visual" />
          </div>

          <div className="form-section" data-aos="fade-left">
            <div className="toggle-buttons">
              <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
              <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group fade-in">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Full Name"
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
