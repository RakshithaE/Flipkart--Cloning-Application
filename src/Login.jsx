import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';


const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/login', formData);
      console.log('Response:', response);
      setMessage(response.data.message);
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/products'); 
      }
    } catch (error) {
      console.error('Error:', error.response || error);
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="signin-container">
       <Link className="navbar-brand" to="/">
            <img
              src="https://seeklogo.com/images/F/flipkart-logo-C9E637A758-seeklogo.com.png"
              alt="Logo"
              style={{ width: "100px",paddingLeft:"70px" }}
            />
            FlipKart
          </Link>
      <h1>Sign In to Shop</h1>
      <form onSubmit={handleSubmit} className="auth-form">
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
        <button type="submit">Sign In</button>
      </form>
      <div className='option'>
      <p>{message}</p>
     
      <p>
      New to Flipkart?  | <Link to="/"> SignUp</Link>
      </p>
      <p>{message}</p>
      </div>
      
    </div>
  );
};

export default Login;
