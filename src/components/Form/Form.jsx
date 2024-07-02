import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./Form.css";

function FormLogin({email, setEmail, password, setPassword, onSubmit}) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Проверяем каждый поле
        if (!email.trim()==="" ||!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!password.trim()==="") newErrors.password = 'Password is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            isValid = false;
        }
        return isValid;
    };
    function  handleSubmit(onSubmit,e)
    {
        e.preventDefault()
        const isValid = validateForm();
        console.log("valid")
        if (isValid) {
            onSubmit();
        }
    }


  return (
    
    <Form onSubmit={async (e)=>  handleSubmit(onSubmit,e)} className='login-form'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter email" 
            onChange={(e) => setEmail(e.target.value)} 
        />
      </Form.Group>
        {errors.email && <p className="error">{errors.email}</p>}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
        {errors.password && <p className="error">{errors.password}</p>}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormLogin;