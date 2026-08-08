import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        navigate('/');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Login failed');
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
      </form>
    </div>
  );
}

export default Login;