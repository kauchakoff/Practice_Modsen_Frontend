import React, { useState } from 'react';
import { login } from '../../utils/auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Form from '../Form/Form';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = login(email, password);
      setUser(user);
      history.push('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <Form
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      >

      </Form>
      {error && <p>{error}</p>}
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
