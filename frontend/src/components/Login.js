import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Cookie from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const response = await axios.post('https://project1-1-1yu5.onrender.com/api/v1/users/login-user', userData, { withCredentials: true });

      console.log(response.data);
      
      Cookie.set("userToken", response.data.token); 
    
      navigate('/users');
    } catch (error) {
      setError(error.response ? error.response.data.message : "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="header">Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputContainer">
            <label htmlFor="username" className="label">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter username" 
              required 
              className="input" 
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="password" className="label">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password" 
              required 
              className="input" 
            />
          </div>

          <button type="submit" className="button">Login</button>
        </form>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
