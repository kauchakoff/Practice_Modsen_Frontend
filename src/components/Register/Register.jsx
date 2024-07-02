import React, { useState } from 'react';
import { register } from '../../utils/auth/auth';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Register.module.css';
import FormRegister from "./FormRegister";

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [login,setLogin] = useState('')

  const handleSubmit = async (e) => {
      try {

          const user = await register(
              {
                  email: email,
                  passwordHash: password,
                  firstname: firstname,
                  lastname: lastname,
                  middleName: middleName,
                  phoneNumber: phoneNumber,
                  gender: gender,
                  birthDate: birthDate,
                  login: login
              }
          );
          setUser(await user)
      } catch (err) {
          setError(err.message);
      }
  };

  return (
    <div className={styles.RegisterContainer}>
      <h1>Register</h1>
      <FormRegister
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        middleName={middleName}
        setMiddleName={setMiddleName}
        gender={gender}
        setGender={setGender}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        login={login}
        setLogin={setLogin}
        onSubmit={()=>handleSubmit()}
      ></FormRegister>
      {error && <p>{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
