import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import loadingGif from './giphy.webp'; // Ensure correct path

const OrSeparator = () => (
  <div className="or-separator">
    <hr className="separator-line" />
    <span className="separator-text">or</span>
    <hr className="separator-line" />
  </div>
);

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="giphy">
        <img 
          src={loadingGif} 
          alt="Loading..." 
          style={{ width: '150px', height: '150px', justifyContent: 'center' }} 
          onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder/image.png'; }}
        />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/register', formData);
      setMessage(response.data.message);
      if (response.status === 201) {
        setIsLoggedIn(true);
        navigate('/product'); 
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="signup-container">
       <Link className="navbar-brand" to="/">
            <img
              src="https://seeklogo.com/images/F/flipkart-logo-C9E637A758-seeklogo.com.png"
              alt="Logo"
              style={{ width: "100px",paddingLeft:"70px" }}
            />
            FlipKart
          </Link>
      <h1>Sign Up to start Shopping</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      <p>
       Existing User? <Link to="/login">Login in</Link>
      </p>
      <OrSeparator />
      <button className="btn btn-outline-secondary">
        <i className="bi bi-google"></i> Sign Up with Google
      </button>
    </div>
  );
};

export default Register;
