import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginForm.css';
import loginImage from '../loginImage.png';
import Loader from '../Loader/Loader'; // Make sure this path is correct

function LoginForm() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    
    setTimeout(async () => {
      try {
        const endpoint = isLogin ? '/api/login' : '/api/register';
        const body = isLogin
          ? { email: formData.email, password: formData.password }
          : formData;

        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
          if (isLogin) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/home');
          } else {
            setSuccess('Registration successful! Please login now.');
            setFormData({ name: '', email: '', password: '', phone: '' });
            setTimeout(() => {
              setIsLogin(true);
              setSuccess('');
            }, 2000);
          }
        } else {
          setError(data.message || `${isLogin ? 'Login' : 'Registration'} failed`);
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error(`${isLogin ? 'Login' : 'Registration'} error:`, err);
      } finally {
        setLoading(false);
      }
    }, 1000); // 
  };

  return (
    <div className="dark-container">
      {loading && <Loader isVisible={loading} />}

      {!loading && (
        <div className="glass-card" data-aos="zoom-in">
          <div className="image-section" data-aos="fade-right">
            <img src={loginImage} alt="Login Visual" />
          </div>

          <div className="form-section" data-aos="fade-left">
            <div className="toggle-buttons">
              <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
              <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="form-group fade-in">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group fade-in">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  minLength="6"
                  disabled={loading}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
