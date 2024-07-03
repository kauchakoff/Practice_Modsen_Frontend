import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

function FormRegister({email, setEmail, password, setPassword,firstname,setFirstname,lastname,setLastname,middleName,
                       setMiddleName,phoneNumber,setPhoneNumber,gender,setGender,login,setLogin,birthDate,setBirthDate, onSubmit}) {

    const phoneRegex = /^(\+\d|\d)+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const [errors, setErrors] = useState({
        email: '',
        login: '',
        firstname: '',
        lastname: '',
        middlename: '',
        phoneNumber: '',
        birthDate: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Проверяем каждый поле
        if (!email.trim() ||!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        // Проверка номера телефона
        if (!phoneNumber.trim() ||!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        if (!birthDate.trim() || (new Date() <= new Date(birthDate))) newErrors.birthDate = 'Birth date is required';

        if (!login.trim()) newErrors.login = 'Login is required';
        if (!firstname.trim()) newErrors.firstname = 'First name is required';
        if (!lastname.trim()) newErrors.lastname = 'Last name is required';
        if (!middleName.trim()) newErrors.middlename = 'Middle name is required';
        if (!password.trim()) newErrors.password = 'Password is required';

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

        if (isValid) {
            onSubmit();
        }
    }








    return (

        <Form onSubmit={async (e)=>  handleSubmit(onSubmit,e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            {errors.email && <p className="error">{errors.email}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Login </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter login"
                    onChange={(e) => setLogin(e.target.value)}
                />
            </Form.Group>
            {errors.login && <p className="error">{errors.login}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </Form.Group>
            {errors.firstname && <p className="error">{errors.firstname}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter lastname"
                    onChange={(e) => setLastname(e.target.value)}
                />
            </Form.Group>
            {errors.lastname && <p className="error">{errors.lastname}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Middlename</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter middlename"
                    onChange={(e) => setMiddleName(e.target.value)}
                />
            </Form.Group>
            {errors.middlename && <p className="error">{errors.middlename}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </Form.Group>
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Birth date</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Enter birth date"
                    onChange={(e) => setBirthDate(e.target.value)}
                />
            </Form.Group>
            {errors.birthDate && <p className="error">{errors.birthDate}</p>}

            <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                    aria-label="Select gender"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select...</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </Form.Select>
            </Form.Group>

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

export default FormRegister;