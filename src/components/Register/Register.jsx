import React, { useState } from 'react';
import { register } from '../../utils/auth/auth';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Register.module.css';
import Form from '../Form/Form';

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = register(email, password);
      setUser(user);
      history.push('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className={styles.RegisterContainer}>
      <h1>Register</h1>
      <Form
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      ></Form>
      {error && <p>{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
