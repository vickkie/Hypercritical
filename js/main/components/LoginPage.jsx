// src/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        window.location.href = '/';
      }
    } catch (err) {
      setError('Could not connect to server, please try again later.');
    }
  };

  return (
    <React.Fragment>
      <div className="loginwrapper">
        <div className="logincanvas">
          <img className="canvasimage" src="assets/images/fond.jpg" alt="Login Background" />
        </div>
        <div className="loginform">
          <form onSubmit={handleSubmit}>
            <h2 className='titleLogin'>Log-in</h2>
       
              <input
                className='inputLogin1'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="mail@mail.com"
              />
              <input
                className='inputLogin2'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
       
            <br />
            <button className='submitButton' type="submit">Enter</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;

