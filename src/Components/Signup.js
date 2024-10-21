import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import TextField from '@mui/material/TextField';
import fundoImage from '../assets/image.png';
import { signupLoginApiCall } from "../Services/apiService";

const Signup = () => {
  const navigate = useNavigate();

  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
 
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await signupLoginApiCall(userData, "register/");
      
      setSuccess('Signup successful! You can now log in.');
      setError(''); 
      navigate('/login');
    } catch (error) {
      setError('Signup failed: ' + (error.response?.data?.error || 'Unknown error'));
      setSuccess(''); 
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div>
          <h2>Fundo</h2>
          <p className='create-text'>Create your Fundo Account</p>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit}>
          <div className="form-group-row">
              <TextField id="first-name" label="First Name" variant="outlined" required fullWidth />
              <TextField id="last-name" label="Last Name" variant="outlined" required fullWidth />
            </div>
            <div className="form-group">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="hint">You can use letters, numbers & periods</p>
            </div>

            <div className="form-group-row-two ">
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <TextField
                id="confirm-password"
                label="Confirm"
                type="password"
                variant="outlined"
                required
                fullWidth
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>

            <p className="hint">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            
            <div className='form-group-row-three'>
              <p id='sign-in-page' className="signin-link" onClick={() => navigate('/login')}>
                Sign in instead
              </p>
              <button type="submit" className="signup-btn">Register</button>
            </div>
          </form>
        </div>

        <div className="signup-image-section">
          <img
            src={fundoImage}
            alt="Fundo promotional" 
            className="signup-image"
          />
          <p className="signup-image-text">One account. All of Fundo working for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
